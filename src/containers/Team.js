import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deletePlayer } from '../redux/actions';

class Team extends Component {
  constructor(props) {
    super(props);
    this.viewPlayer = this.viewPlayer.bind(this);
  }

  viewPlayer(playerId) {
    browserHistory.push(`/player/${playerId}`);
  }

  render() {
    if (this.props.team.length > 0) {
      let playerList = this.props.team.map((player) => 
        <div key={player.playerId} className="row">
          <div className="col-sm-12 col-md-6">
            <div className="card">
              <h3 className="card-header">{player.firstName} {player.lastName}</h3>
              <div className="card-block">
                <h4 className="card-title">{player.teamCity} {player.teamName} (#{player.jersey})</h4>
                <p className="card-text"></p>
                <button onClick={() => this.viewPlayer(player.playerId)} className="btn btn-outline-primary btn-sm">View Player</button>
                <button onClick={() => this.props.deletePlayer(player.playerId)} className="btn btn-outline-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
      );
      return (
        <div>{playerList}</div>
      )
    } else {
      return (
        <div>Team is empty</div>
      )
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.team.length !== nextProps.team.length) {
      return true;
    }

    return false;
  }
}

function mapStateToProps(state) {
  return {
    team: state.team
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deletePlayer,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
