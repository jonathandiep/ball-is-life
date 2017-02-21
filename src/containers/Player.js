import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Observable } from 'rxjs';
import axios from 'axios';
import * as _ from 'lodash';

import {
  selectPlayer,
  getPlayerDetails,
  getPlayerShots,
  resetActivePlayer,
  addPlayer,
  deletePlayer,
  retrievePlayerStorage,
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

  /**
   * TODO: personId gets into the data instead of playerId
   */
  componentWillMount() {
    let player = JSON.parse(localStorage.getItem('reduxPersist:activePlayer'));
    console.log(player);
    if (!_.isEmpty(player)) {
      console.log(player.playerId);
      console.log(player.personId);
      if (player.playerId === Number(this.props.params.playerId)) {
        console.log(Number(this.props.params.playerId));
        this.props.retrievePlayerStorage(player);
        this.setState({ loading: false });
      }
    } else {
      player = JSON.parse(localStorage.getItem('reduxPersist:team')).filter((player) => {
        if (player.playerId === Number(this.props.params.playerId)) {
          return player;
        }
      });
      console.log(player);

      if (player.length > 0) {
        this.props.retrievePlayerStorage(player);
        this.setState({ loading: false });
      }
    }
  }

  componentDidMount() {
    if (this.state.loading) {
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
  }

  componentWillUnmount() {
    // redux action to reset current player
    this.props.resetActivePlayer();
    if (!_.isEmpty(this.state.subscription)) {
      this.state.subscription.unsubscribe();
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>
    } else {
      /*
      let button;

      let playerInTeam = this.props.team.filter((player) => {
        if (player.playerId === Number(this.props.params)) {
          return player;
        }
      })

      if (playerInTeam.length > 0) {
        button = <button onClick={() => this.props.deletePlayer(this.props.player.playerId)} className="btn btn-danger">Delete</button>;
      } else {
        button = (
          <button onClick={() => this.props.addPlayer(this.props.player)} className="btn btn-primary">Add to Team</button>
        )
      }
      */

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
    player: state.activePlayer,
    team: state.team,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectPlayer,
      getPlayerDetails,
      getPlayerShots,
      resetActivePlayer,
      addPlayer,
      deletePlayer,
      retrievePlayerStorage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
