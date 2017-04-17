import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PlayerDetail({ player, playerId, button }) {
  return (
    <div className="col-md-4">
      <div className="card">
        {/* <h3 className="card-header">{player.firstName} {player.lastName}</h3> */}
        <div className="card-block">
          <img className="img-thumbnail" alt="player" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`} />
          <h5 className="card-title">{player.firstName} {player.lastName} (#{player.jersey})</h5>
          <Link to={`/team/${player.teamId}`}><img src={`https://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${player.teamAbbreviation}.svg`} alt={player.teamName} /></Link>
          <h6 className="card-title"><b>Team:</b> <Link to={`/team/${player.teamId}`}>{player.teamCity} {player.teamName}</Link></h6>
          <p className="card-text"><b>Position:</b> {player.position}</p>
          <p className="card-text"><b>Height:</b> {player.height}</p>
          <p className="card-text"><b>Weight:</b> {player.weight} lbs.</p>
          {button}
        </div>
      </div>
    </div>
  );
}

PlayerDetail.propTypes = {
  player: PropTypes.object.isRequired,
  playerId: PropTypes.string,
  button: PropTypes.element,
};

export default PlayerDetail;
