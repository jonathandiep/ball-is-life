import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const teams = require('nba/data/teams.json');

export default class Teams extends Component {
  // console.log(teams);
  // filter teams before getting displayed;
  constructor(props) {
    super(props);

    this.state = {
      teams,
      sortType: 'teamId',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.teams !== nextState.teams) {
      console.log('componentShouldUpdate');
      return true;
    }

    return false;
  }

  handleChange(event) {
    console.log(`event: ${event.target.value}`);
    this.sortTeams(event.target.value);
    this.forceUpdate();
  }

  sortTeams(type) {
    console.log(`sortTeams: ${type}`);
    switch (type) {
      case 'team-ascending': {
        return teams.sort((a, b) => {
          if (a.simpleName < b.simpleName) {
            return -1;
          }
          if (a.simpleName > b.simpleName) {
            return 1;
          }

          return 0;
        });
      }
      case 'team-descending': {
        return teams.sort((a, b) => {
          if (a.simpleName > b.simpleName) {
            return -1;
          }
          if (a.simpleName < b.simpleName) {
            return 1;
          }

          return 0;
        });
      }
      case 'city-ascending': {
        return teams.sort((a, b) => {
          if (a.location < b.location) {
            return -1;
          }
          if (a.location > b.location) {
            return 1;
          }

          return 0;
        });
      }
      case 'city-descending': {
        return teams.sort((a, b) => {
          if (a.location > b.location) {
            return -1;
          }
          if (a.location < b.location) {
            return 1;
          }

          return 0;
        });
      }
      default:
        return teams;
    }
  }

  render() {
    this.state.teams = this.sortTeams(this.state.sortType);

    const displayTeams = teams.map(team =>
      <Link to={`/team/${team.teamId}`} key={team.teamId}>
        <div className="card">
          <img className="card-img-top img-fluid mx-auto d-block" src={`https://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${team.abbreviation}.svg`} alt={team.teamName} />
          <div className="card-block">
            <h4 className="text-center">{team.teamName}</h4>
          </div>
        </div>
      </Link>,
    );
    return (
      <div>
        <h3>Select an NBA Team</h3>
        <p>Sort By:</p>
        <select className="form-control" onChange={this.handleChange}>
          <option value="teamId">-</option>
          <option value="team-ascending">Team: A - Z</option>
          <option value="team-descending">Team: Z - A</option>
          <option value="city-ascending">City: A - Z</option>
          <option value="city-descending">City: Z - A</option>
        </select>
        <hr />
        <div className="card-deck">
          {displayTeams}
        </div>
      </div>
    );
  }

}
