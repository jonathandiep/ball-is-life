// Make a heat map component here. Just pass data into it
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';

import Court from './Court';
import { scatteredShots } from '../shots/displayShots';
import '../styles/styles.css';

/* eslint-disable import/prefer-default-export */
export class CourtHeatmap extends Component {
  static propTypes = {
    games: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { selectedGame: {} };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    const selectedGame = this.props.games[event.target.value];
    const gameData = selectedGame.shotData.map((shot) => {
      let { locX, locY } = shot;
      const { eventType, period, minutesRemaining, secondsRemaining } = shot;
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
    });

    const elements = document.getElementsByClassName('shot-point');
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i].parentNode.removeChild(elements[i]);
    }

    scatteredShots(gameData);
    this.setState({ selectedGame });
  }

  /**
   * Dropdown of a player's games
   *
   * @returns React Element
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
      </div>
    );
  }
}
