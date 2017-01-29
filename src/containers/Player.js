import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { selectPlayer, getPlayerDetails, getPlayerShots } from '../actions';

/**
 * TODO: If user goes directly to this URL, figure out a way to get player data and then add to redux
 */
class Player extends Component {
  constructor(props) {
    super(props);

    if (this.props.player === null) {
      const players = require('nba/data/players.json');
      
      let player = players.filter((player) => {
        if (Number(player.playerId) === Number(this.props.params.playerId)) {
          return player;
        }
      });

      this.props.selectPlayer(player[0]);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.player !== nextProps.player) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    let details = axios.get(`http://localhost:3333/player-details/${this.props.params.playerId}`)
    let shots = axios.get(`http://localhost:3333/player-shots/${this.props.params.playerId}`)

    Promise.all([details, shots])
      .then(res => {
        console.log(res[0].data);
        console.log(res[1].data);
        this.props.getPlayerDetails(res[0].data);
        this.props.getPlayerShots(res[1].data);
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.props.player) {
      return (
        <div className="card">
          <h3 className="card-header">{this.props.player.firstName} {this.props.player.lastName}</h3>
          <div className="card-block">
            <h4 className="card-title">Special title treatment</h4>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      )
    }

    return <div>Loading</div>
  } 



}

function mapStateToProps(state) {
  return {
    player: state.activePlayer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectPlayer,
      getPlayerDetails,
      getPlayerShots
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
