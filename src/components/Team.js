import React from 'react';
import { Link } from 'react-router-dom';

const teams = require('nba/data/teams.json');
const players = require('nba/data/players.json');

export default function Team(props) {
  const roster = players.filter(player => player.teamId === Number(props.match.params.teamId));
  const selectedTeam = teams.filter(team => team.teamId === Number(props.match.params.teamId))[0];

  const displayRoster = roster.map(player =>
    <Link to={`/player/${player.playerId}`} key={player.playerId}>
      <div className="card">
        <img className="card-img-top img-fluid mx-auto d-block" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.playerId}.png`} alt={`${player.firstName} ${player.lastName}`} />
        <div className="card-block">
          <h4 className="text-center">{player.firstName} {player.lastName}</h4>
        </div>
      </div>
    </Link>,
  );

  return (
    <div>
      <h3>{selectedTeam.teamName} Team Roster</h3>
      <div className="card-columns">
        {displayRoster}
      </div>
    </div>
  );
}
