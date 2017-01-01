import React, { Component } from 'react';

//const players = require('nba/data/players.json');

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({ term: event.target.value });
  }

  render() {
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
              Search Dropdown goes here
            </div>
          </div>
        </form>
      </div>
    )
  }
}