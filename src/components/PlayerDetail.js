// Make a player detail component here. Pass in player details

import React from 'react';

function PlayerDetail({ player, playerId, button }) {
  return (
    <div className="col-md-4">
      <div className="card">
        <h3 className="card-header">{player.firstName} {player.lastName}</h3>
        <div className="card-block">
          <img className="img-thumbnail" alt="player" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`} />
          <h5 className="card-title">{player.teamCity} {player.teamName} (#{player.jersey})</h5>
          <p className="card-text">Position: {player.position}</p>
          <p className="card-text">Height: {player.height}</p>
          <p className="card-text">Weight: {player.weight} lbs.</p>
          {button}
        </div>
      </div>
    </div>
  );
}

PlayerDetail.propTypes = {
  player: React.PropTypes.object.isRequired,
  playerId: React.PropTypes.string,
  button: React.PropTypes.element,
};

export default PlayerDetail;
