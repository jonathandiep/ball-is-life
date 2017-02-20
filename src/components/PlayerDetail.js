// Make a player detail component here. Pass in player details

import React from 'react';

export const PlayerDetail = (props) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <h3 className="card-header">{props.player.firstName} {props.player.lastName}</h3>
        <div className="card-block">
          <h4 className="card-title">{props.player.teamCity} {props.player.teamName} (#{props.player.jersey})</h4>
          <p className="card-text">Position: {props.player.position}</p>
          <p className="card-text">Height: {props.player.height}</p>
          <p className="card-text">Weight: {props.player.weight} lbs.</p>
          <button onClick={() => props.addPlayer(props.player)} className="btn btn-primary">Add to Team</button>
        </div>
      </div>
    </div>
  );
}