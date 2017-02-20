import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Observable } from 'rxjs';
import axios from 'axios';

import {
  selectPlayer,
  getPlayerDetails,
  getPlayerShots,
  resetPlayer,
  addPlayer,
} from '../redux/actions';
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

    this.state = {
      loading: true,
      subscription: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.player !== nextProps.player) {
      return true;
    }

    if (this.state.loading !== nextState.loading) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    let details = Observable.fromPromise(
      axios.get(`http://localhost:3333/player-details/${this.props.params.playerId}`)
    );
    let shots = Observable.fromPromise(
      axios.get(`http://localhost:3333/player-shots/${this.props.params.playerId}`)
    );

    let source = Observable.merge(details, shots)

    let subscription = source.subscribe((res) => {
      console.log(res.data);
      if (res.data.commonPlayerInfo) {
        this.props.getPlayerDetails(res.data.commonPlayerInfo[0]);
      } else {
        this.props.getPlayerShots(res.data);
      }
    }, (err) => {
      console.error(err);
    }, () => this.setState({ loading: false }));

    this.setState({ subscription });
  }

  componentWillUnmount() {
    // redux action to reset current player
    this.props.resetPlayer();
    this.state.subscription.unsubscribe();
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>
    } else {
      return (
        <div className="container">
          <div className="row">
            <PlayerDetail player={this.props.player} addPlayer={this.props.addPlayer} />
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
      resetPlayer,
      addPlayer,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
