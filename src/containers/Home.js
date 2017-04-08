import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Observable } from 'rxjs';
import { isEmpty } from 'lodash';
import axios from 'axios';

import { selectPlayer, retrievePlayers, retrievePlayersStorage } from '../redux/actions';

class Home extends Component {
  static propTypes = {
    players: PropTypes.array,
    retrievePlayers: PropTypes.func,
    selectPlayer: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      results: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  // Make a call to retrieve player data if it doesn't exist in redux store or localStorage
  componentWillMount() {
    if (this.props.players.length === 0 && isEmpty(localStorage.getItem('reduxPersist:players'))) {
      const players = Observable.fromPromise(axios.get(`${process.env.PUBLIC_URL}/players`));
      const subscription = players.subscribe((res) => {
        this.props.retrievePlayers(res.data);
      }, err => console.error(err));

      this.setState({ subscription });
    }
  }

  componentWillUnmount() {
    if (!isEmpty(this.state.subscription)) {
      this.state.subscription.unsubscribe();
    }
  }

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
        }),
      });
    } else {
      this.setState({
        results: [],
        subscription: [],
      });
    }
  }

  render() {
    const playersList = this.state.results.map(player =>
      <div key={player.playerId} onClick={() => this.props.selectPlayer(player)}>
        <Link to={`/player/${player.playerId}`}><li>{player.fullName}</li></Link>
      </div>,
    );

    return (
      <div className="container">
        <div className="col-12 col-md-8 offset-md-2">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search a player..."
                onChange={this.onChange}
              />
              <div>
                <ul>
                  {playersList}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectPlayer,
      retrievePlayers,
      retrievePlayersStorage,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
