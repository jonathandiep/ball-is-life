import React, { Component } from 'react';
import { Link } from 'react-router';
import * as _ from 'lodash';

const players = require('nba/data/players.json');

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      players,
      results: []
    };

    this.onChange = this.onChange.bind(this);
  }

  // the term state should affect what values (names) should appear in the dropdown
  onChange(event) {
    this.setState({ term: event.target.value });
    // eslint-disable-next-line
    this.setState({ results: this.state.players.filter((player) => {
        if (player.firstName.includes(event.target.value) || player.lastName.includes(event.target.value)) {
          return player;
        }
      })
    });
  }

  render() {
    let playersList = this.state.results.map(player => 
      <div key={player.playerId}>
        <Link to={`/player/${player.playerId}`}><li>{player.firstName} {player.lastName}</li></Link>
      </div>
    );

    return (
      <div>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search a player... (Capitalization matters)"
              onChange={this.onChange} />
            <div>
              Search Results:
              <ul>
                {playersList}
              </ul>
            </div>
          </div>
        </form>
      </div>
    )
  }
}