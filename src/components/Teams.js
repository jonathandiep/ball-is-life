import React from 'react';
import { Link } from 'react-router-dom';

const teams = require('nba/data/teams.json');

export default function Teams() {
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
      <h3>List of NBA teams here!</h3>
      <p>TODO: View By Sort goes here...</p>
      <div className="card-columns">
        {displayTeams}
      </div>
    </div>
  );
}
