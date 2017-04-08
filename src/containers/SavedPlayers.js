import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deletePlayer } from '../redux/actions';

class SavedPlayers extends Component {
  static propTypes = {
    team: PropTypes.array.isRequired,
    deletePlayer: PropTypes.func,
  }

  static defaultProps = {
    team: [],
  }
  constructor(props) {
    super(props);
    this.viewPlayer = this.viewPlayer.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.team.length !== nextProps.team.length) {
      return true;
    }
    return false;
  }

  viewPlayer(playerId) {
    browserHistory.push(`/player/${playerId}`);
  }

  render() {
    if (this.props.team.length > 0) {
      const playerList = this.props.team.map(player =>
        <div key={player.playerId || player.personId} className="row">
          <div className="col-sm-12 col-md-6">
            <div className="card">
              <h3 className="card-header">{player.firstName} {player.lastName}</h3>
              <div className="card-block">
                <h4 className="card-title">{player.teamCity} {player.teamName} (#{player.jersey})</h4>
                <button onClick={() => this.viewPlayer(player.playerId)} className="btn btn-outline-primary btn-sm">View Player</button>
                <button onClick={() => this.props.deletePlayer(player.playerId)} className="btn btn-outline-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>,
      );
      return <div>{playerList}</div>;
    }

    return (
      <div className="col-12 col-md-8 offset-md-2">
        <p className="text-center">You have no saved players</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    team: state.team,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPlayers);
