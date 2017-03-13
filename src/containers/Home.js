/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import axios from 'axios';

import { selectPlayer, retrievePlayers, retrievePlayersStorage } from '../redux/actions';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      results: [],
    };

    this.onChange = this.onChange.bind(this);

  }


  /**
   * TODO: Debounce so app doesn't have to make call every change (make it 500ms or so)
   */
  onChange(event) {
    this.setState({ term: event.target.value });

    if (event.target.value === '' && this.state.results !== []) {
      this.setState({ results: [] });
    }

    if (event.target.value) {
      this.setState({
        results: this.props.players.filter((player) => {
          if (player.downcaseName.includes(event.target.value.toLowerCase())) {
            return player;
          }
        })
      });
    } else {
      this.setState({
        results: [],
        subscription: []
      });
    }
  }

  // Make a call to retrieve player data if it doesn't exist in redux store or localStorage
  componentWillMount() {
    if (this.props.players.length === 0 && _.isEmpty(localStorage.getItem('reduxPersist:players'))) {
      let players = Observable.fromPromise(axios.get('http://localhost:4000/players'));
      let subscription = players.subscribe((res) => {
        this.props.retrievePlayers(res.data);
      }, err => console.error(err));

      this.setState({ subscription });
    }
  }

  render() {
    let playersList = this.state.results.map(player =>
      <div key={player.playerId} onClick={() => this.props.selectPlayer(player)}>
        <Link to={`/player/${player.playerId}`}><li>{player.fullName}</li></Link>
      </div>
    );

    return (
      <div>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search a player..."
              onChange={this.onChange} />
            <div>
              <ul>
                {playersList}
              </ul>
            </div>
          </div>
        </form>
      </div>
    )
  }

  componentWillUnmount() {
    if (!_.isEmpty(this.state.subscription)) {
      this.state.subscription.unsubscribe();
    }
  }
}

function mapStateToProps(state) {
  return {
    players: state.players
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectPlayer,
      retrievePlayers,
      retrievePlayersStorage,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
