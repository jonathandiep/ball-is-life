import React from 'react';

const teams = require('nba/data/teams.json');

function Teams() {
  const displayTeams = teams.map(team =>
    <div key={team.teamId} className="card">
      <img className="card-img-top mx-auto d-block" src={`http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${team.abbreviation}.svg`} alt={team.teamName} />
      <div className="card-block">
        <h4 className="text-center">{team.teamName}</h4>
      </div>
    </div>,
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

export default Teams;
