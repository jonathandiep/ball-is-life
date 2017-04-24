// Make a heat map component here. Just pass data into it
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Court from './Court';
import scatteredShots from '../shots/scatteredShots';
import { fieldGoalShots, fieldGoalAttempts } from '../shots/hexbinShots';
import '../styles/styles.css';

/* eslint-disable import/prefer-default-export */
export class CourtHeatmap extends Component {
  static propTypes = {
    games: PropTypes.array.isRequired,
    shots: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = { selectedGame: {} };

    this.handleChange = this.handleChange.bind(this);
    this.fieldGoalHeatmap = this.fieldGoalHeatmap.bind(this);
    this.shotsTaken = this.shotsTaken.bind(this);
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.games !== nextProps.games) {
      return true;
    }

    if (this.state.selectedGame !== nextState.selectedGame) {
      return true;
    }

    return false;
  }
  */

  /**
   * Converts the NBA location data into the location that it will display in d3. Also strips out
   * the unnecessary data
   *
   * @param {any} shotData
   * @returns Object
   *
   * @memberOf CourtHeatmap
   */
  convertPoints(shotData) {
    let { locX, locY } = shotData;
    const { eventType, period, minutesRemaining, secondsRemaining } = shotData;
    if (locX < 0) {
      locX = Math.abs(locX) + 250;
    } else {
      locX = 250 - locX;
    }

    locY = 415 - locY;

    return {
      eventType,
      locX,
      locY,
      period,
      minutesRemaining,
      secondsRemaining,
    };
  }

  clearCourt() {
    const scatteredPoints = document.getElementsByClassName('shot-point');
    for (let i = scatteredPoints.length - 1; i >= 0; i--) {
      scatteredPoints[i].parentNode.removeChild(scatteredPoints[i]);
    }

    const hexbins = document.getElementsByClassName('hexbin');
    for (let i = hexbins.length - 1; i >= 0; i--) {
      hexbins[i].parentNode.removeChild(hexbins[i]);
    }
  }

  handleChange(event) {
    const selectedGame = this.props.games[event.target.value];
    const gameData = selectedGame.shotData.map(shot => this.convertPoints(shot));

    this.clearCourt();

    scatteredShots(gameData);
    this.setState({ selectedGame });
  }

  fieldGoalHeatmap() {
    this.clearCourt();
    const shotData = this.props.shots.map(shot => this.convertPoints(shot));
    fieldGoalShots(shotData);
  }

  shotsTaken() {
    this.clearCourt();
    const shotData = this.props.shots.map(shot => this.convertPoints(shot));
    fieldGoalAttempts(shotData);
  }

  /**
   * Dropdown of a player's games
   *
   * @returns React Element ghjghjghhghghjgjggkg
   *
   * @memberOf CourtHeatmap
   */

  parseGameDate(date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);
    return `${month}/${day}/${year}`;
  }

  render() {
    const options = this.props.games.map((game, index) => (
      <option key={game.gameId} value={index}>{game.htm} vs. {game.vtm} ({this.parseGameDate(game.gameDate)})</option>
    ));

    return (
      <div className="col-md-8">
        <Court />
        <select className="form-control" id="game-dropdown" onChange={this.handleChange}>
          <option>Select A Game...</option>
          {options}
        </select>
        <a onClick={this.fieldGoalHeatmap} className="heatmap-link">View 2016-2017 Field Goal Heatmap</a><br />
        <a onClick={this.shotsTaken} className="heatmap-link">View Heatmap of shots attempted</a>
      </div>
    );
  }
}
