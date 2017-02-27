// Make a player detail component here. Pass in player details

import React from 'react';

PlayerDetail.propTypes = {
  player: React.PropTypes.object.isRequired,
  button: React.PropTypes.element,
};

function PlayerDetail({ player = {}, button }) {
  return (
    <div className="col-md-4">
      <div className="card">
        <h3 className="card-header">{player.firstName} {player.lastName}</h3>
        <div className="card-block">
          <h4 className="card-title">{player.teamCity} {player.teamName} (#{player.jersey})</h4>
          <p className="card-text">Position: {player.position}</p>
          <p className="card-text">Height: {player.height}</p>
          <p className="card-text">Weight: {player.weight} lbs.</p>
          {button}
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;
