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
import PlayerDetail from '../components/PlayerDetail';
import { CourtHeatmap } from '../components/CourtHeatmap';

const players = require('nba/data/players.json');

class Player extends Component {
  static propTypes = {
    player: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    addPlayer: React.PropTypes.func,
    deletePlayer: React.PropTypes.func,
    selectPlayer: React.PropTypes.func,
    getPlayerDetails: React.PropTypes.func,
    getPlayerShots: React.PropTypes.func,
    resetActivePlayer: React.PropTypes.func,
    retrievePlayerStorage: React.PropTypes.func,
  }

  static defaultProps = {
    player: {},
    params: {
      playerId: 0,
    },
  }

  constructor(props) {
    super(props);

    if (this.props.player === null) {
      const player = players.filter((filteredPlayer) => {
        if (Number(filteredPlayer.playerId) === Number(this.props.params.playerId)) {
          return filteredPlayer;
        }
      });

      this.props.selectPlayer(player[0]);
    }

    this.state = {
      loading: true,
      subscription: [],
      playerInTeam: [],
    };

    this.sortShotsToGames = this.sortShotsToGames.bind(this);
  }

  componentWillMount() {
    let activePlayer = JSON.parse(localStorage.getItem('reduxPersist:activePlayer'));
    if (!_.isEmpty(activePlayer)) {
      if (activePlayer.personId === Number(this.props.params.playerId)) {
        this.props.retrievePlayerStorage(activePlayer);
        this.setState({ loading: false });
      }
    } else if (localStorage.getItem('reduxPersist:team')) {
      activePlayer = JSON.parse(localStorage.getItem('reduxPersist:team')).filter((player) => {
        if (player.playerId === Number(this.props.params.playerId)) {
          return player;
        }
      });

      if (activePlayer.length > 0) {
        this.props.retrievePlayerStorage(activePlayer[0]);
        this.setState({ loading: false });
      }
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      const details = Observable.fromPromise(
        axios.get(`http://localhost:4000/player-details/${this.props.params.playerId}`),
      );
      const shots = Observable.fromPromise(
        axios.get(`http://localhost:4000/player-shots/${this.props.params.playerId}`),
      );

      const source = Observable.merge(details, shots);

      const subscription = source.subscribe((res) => {
        console.log(res.data);
        if (res.data.commonPlayerInfo) {
          this.props.getPlayerDetails(res.data.commonPlayerInfo[0]);
        } else {
          this.props.getPlayerShots(res.data);
        }
      }, (err) => {
        console.error(err);
      }, () => this.setState({ loading: false }));

      /* eslint-disable react/no-did-mount-set-state*/
      this.setState({ subscription });
    }
  }

  componentWillReceiveProps(nextProps) {
    const playerInTeam = nextProps.team.filter((player) => {
      if (player.personId === Number(this.props.params.playerId)) {
        return player;
      }
    });

    this.setState({ playerInTeam });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.playerInTeam !== nextState.playerInTeam) {
      return true;
    }

    if (this.props.player !== nextProps.player) {
      return true;
    }

    if (this.state.loading !== nextState.loading) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    // redux action to reset current player
    this.props.resetActivePlayer();
    if (!_.isEmpty(this.state.subscription)) {
      this.state.subscription.unsubscribe();
    }
  }

  sortShotsToGames(shots) {
    // modify shots here (use binary search to insert shot in the game)
    const games = [];

    shots.forEach((shot) => {
      if (typeof games[0] === 'undefined' || games[0].gameId !== shot.gameId) {
        games.unshift({
          gameId: shot.gameId,
          htm: shot.htm,
          vtm: shot.vtm,
          gameDate: shot.gameDate,
          shotData: [
            {
              eventType: shot.eventType,
              shotType: shot.shotType,
              period: shot.period,
              minutesRemaining: shot.minutesRemaining,
              secondsRemaining: shot.secondsRemaining,
              locX: shot.locX,
              locY: shot.locY,
            },
          ],
        });
      } else {
        games[0].shotData.push({
          eventType: shot.eventType,
          shotType: shot.shotType,
          period: shot.period,
          minutesRemaining: shot.minutesRemaining,
          secondsRemaining: shot.secondsRemaining,
          locX: shot.locX,
          locY: shot.locY,
        });
      }
    });

    return games;
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }

    let button;
    let games = [];

    if (this.state.playerInTeam.length > 0) {
      button = <button onClick={() => this.props.deletePlayer(this.props.player.playerId)} className="btn btn-danger">Delete</button>;
    } else {
      button = (
        <button onClick={() => this.props.addPlayer(this.props.player)} className="btn btn-primary">Add to Team</button>
      );
    }

    if (this.props.player.shot_Chart_Detail) {
      games = this.sortShotsToGames(this.props.player.shot_Chart_Detail);
      console.log(games);
    }

    return (
      <div className="container">
        <div className="row">
          <PlayerDetail player={this.props.player} button={button} />
          <CourtHeatmap games={games} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    player: state.activePlayer,
    team: state.team,
  };
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
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
