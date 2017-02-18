import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { selectPlayer, getPlayerDetails, getPlayerShots, resetPlayer } from '../actions';
import { PlayerDetail } from '../components/PlayerDetail';
import { CourtHeatmap } from '../components/CourtHeatmap';

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

    this.state = { loading: true };
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

    /**
     * TODO: Use Observables instead of promises to allow cancel (because data takes too long to load)
     * then have subscriptions be unsubscribed at componentWillUnmount()
     */
    // Get basketball player's data and send to reducers
    Promise.all([details, shots])
      .then(res => {
        this.props.getPlayerDetails(res[0].data.commonPlayerInfo[0]);
        this.props.getPlayerShots(res[1].data);
        this.setState({ loading: false });
      })
      .catch(err => console.error(err));
  }

  componentWillUnmount() {
    // redux action to reset current player
    this.props.resetPlayer();
  }

  render() {
    if (Object.keys(this.props.player).length === 0 && this.props.player.constructor === Object && this.state.loading) {
      return <div>Loading</div>
    } else {
      return (
        <div className="container">
          <div className="row">
            <PlayerDetail player={this.props.player} />
            <CourtHeatmap />
          </div>
        </div>
      )
    }

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
      getPlayerShots,
      resetPlayer
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
