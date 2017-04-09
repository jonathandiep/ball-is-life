import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import {
  getPlayerDetails,
  getPlayerShots,
  resetActivePlayer,
  savePlayer,
  deletePlayer,
  retrievePlayerStorage,
} from '../redux/actions';
import PlayerDetail from '../components/PlayerDetail';
import { CourtHeatmap } from '../components/CourtHeatmap';
import Loading from '../components/Loading';
import { funFacts } from '../assets/facts';

const nba = require('nba');

class Player extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    savePlayer: PropTypes.func,
    deletePlayer: PropTypes.func,
    // selectPlayer: PropTypes.func,
    getPlayerDetails: PropTypes.func,
    getPlayerShots: PropTypes.func,
    resetActivePlayer: PropTypes.func,
    retrievePlayerStorage: PropTypes.func,
  }

  static defaultProps = {
    player: {},
    params: {
      playerId: 0,
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      subscription: [],
      playerInTeam: [],
      funFact: '',
    };

    this.sortShotsToGames = this.sortShotsToGames.bind(this);
  }

  componentWillMount() {
    this.setState({
      funFact: funFacts[Math.floor(Math.random() * funFacts.length)],
    });

    let activePlayer = JSON.parse(localStorage.getItem('reduxPersist:activePlayer'));
    if (!isEmpty(activePlayer)) {
      if (activePlayer.personId === Number(this.props.match.params.playerId)) {
        this.props.retrievePlayerStorage(activePlayer);
        this.setState({ loading: false });
      }
    } else if (localStorage.getItem('reduxPersist:team')) {
      activePlayer = JSON.parse(localStorage.getItem('reduxPersist:team')).filter((player) => {
        if (player.playerId === Number(this.props.match.params.playerId)) {
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
      const playerId = this.props.match.params.playerId;
      const loading = [true, true];

      nba.stats.playerInfo({ PlayerID: playerId })
        .then((data) => {
          this.props.getPlayerDetails(data.commonPlayerInfo[0]);
          loading[0] = false;
        })
        .catch(err => console.error(err));

      nba.stats.shots({ PlayerID: playerId })
        .then((data) => {
          this.props.getPlayerShots(data);
          loading[1] = false;
        })
        .catch(err => console.error(err));

      setInterval(() => {
        if (!loading[0] && !loading[1]) {
          this.setState({ loading: false });
          window.clearInterval();
        }
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    const playerInTeam = nextProps.team.filter((player) => {
      if (player.personId === Number(this.props.match.params.playerId)) {
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

  // redux action to reset current player
  componentWillUnmount() {
    this.props.resetActivePlayer();
  }

  sortShotsToGames(shots) {
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
      return <Loading fact={this.state.funFact} />;
    }

    let button;
    let games = [];

    if (this.state.playerInTeam.length > 0) {
      button = <button onClick={() => this.props.deletePlayer(this.props.player.playerId)} className="btn btn-danger">Delete</button>;
    } else {
      button = (
        <button onClick={() => this.props.savePlayer(this.props.player)} className="btn btn-primary">Save Player</button>
      );
    }

    if (this.props.player.shot_Chart_Detail) {
      games = this.sortShotsToGames(this.props.player.shot_Chart_Detail);
    }

    return (
      <div className="container">
        <div className="row">
          <PlayerDetail player={this.props.player} button={button} playerId={this.props.match.params.playerId} />
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
      getPlayerDetails,
      getPlayerShots,
      resetActivePlayer,
      savePlayer,
      deletePlayer,
      retrievePlayerStorage,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
