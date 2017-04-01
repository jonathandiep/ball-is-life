// Make a heat map component here. Just pass data into it
import React, { Component } from 'react';
import * as d3 from 'd3';


import '../styles/styles.css';

/* eslint-disable import/prefer-default-export */
export class CourtHeatmap extends Component {
  static propTypes = {
    games: React.PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { selectedGame: {} };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const svg = d3.select(document.getElementById('chart'))
      .append('svg')
      .attr('id', 'svg-court')
      .attr('width', 500)
      .attr('height', 470)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', '3px');

    // Half-court background
    svg.append('rect')
      .attr('width', 500)
      .attr('height', 470)
      .attr('stroke-width', '5px');

    // Free throw circle (upper half)
    svg.append('circle')
      .attr('cx', 250)
      .attr('cy', 280)
      .attr('r', 60);

    // Big box (where players stand during free throws)
    svg.append('rect')
      .attr('x', 170)
      .attr('y', 280)
      .attr('width', 160)
      .attr('height', 190);

    // Free throw circle (lower half)
    svg.append('path')
      .attr('d', 'M190,280 l120,0 A50,50 0 0,1 190,280 z')
      .attr('stroke-dasharray', '14, 14');

    // Small box
    svg.append('rect')
      .attr('x', 190)
      .attr('y', 280)
      .attr('width', 120)
      .attr('height', 190)
      .attr('fill-opacity', 0);

    // Hoop
    svg.append('circle')
      .attr('cx', 250)
      .attr('cy', 420)
      .attr('r', 7.5)
      .attr('stroke', 'gray');

    // Backboard
    svg.append('line')
      .attr('x1', 220)
      .attr('y1', 430)
      .attr('x2', 280)
      .attr('y2', 430)
      .attr('stroke', 'gray');

    // Left Restricted Line
    svg.append('line')
      .attr('x1', 210)
      .attr('y1', 431.5)
      .attr('x2', 210)
      .attr('y2', 417.5)
      .attr('stroke', 'gray');

    // Right Restricted Line
    svg.append('line')
      .attr('x1', 290)
      .attr('y1', 431.5)
      .attr('x2', 290)
      .attr('y2', 417.5)
      .attr('stroke', 'gray');

    // Restricted Arc
    const restrictedArc = d3.arc()
      .innerRadius(40)
      .outerRadius(40)
      .startAngle(90 * (Math.PI / 180))
      .endAngle(90 * (-Math.PI / 180));

    svg.append('path')
      .attr('d', restrictedArc)
      .attr('transform', 'translate(250,420)')
      .attr('stroke', 'gray');

    // Left 3-point line
    svg.append('line')
      .attr('x1', 30)
      .attr('y1', 470)
      .attr('x2', 30)
      .attr('y2', 330);

     // Right 3-point line
    svg.append('line')
      .attr('x1', 470)
      .attr('y1', 470)
      .attr('x2', 470)
      .attr('y2', 330);

    // 3-point Arc
    const threePointArc = d3.arc()
      .innerRadius(237.5)
      .outerRadius(237.5)
      .startAngle(68 * (Math.PI / 180))
      .endAngle(68 * (-Math.PI / 180));

    svg.append('path')
      .attr('d', threePointArc)
      .attr('transform', 'translate(250,420)');

    svg.append('line')
      .attr('x1', 140)
      .attr('y1', 470)
      .attr('x2', 140)
      .attr('y2', 460);

    svg.append('line')
      .attr('x1', 360)
      .attr('y1', 470)
      .attr('x2', 360)
      .attr('y2', 460);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 400)
      .attr('x2', 160)
      .attr('y2', 400);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 390)
      .attr('x2', 160)
      .attr('y2', 390);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 360)
      .attr('x2', 160)
      .attr('y2', 360);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 330)
      .attr('x2', 160)
      .attr('y2', 330);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 400)
      .attr('x2', 340)
      .attr('y2', 400);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 390)
      .attr('x2', 340)
      .attr('y2', 390);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 360)
      .attr('x2', 340)
      .attr('y2', 360);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 330)
      .attr('x2', 340)
      .attr('y2', 330);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.games !== nextProps.games) {
      return true;
    }

    if (this.state.selectedGame !== nextState.selectedGame) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    // unsubscribe
  }

  handleChange(event) {
    // console.log(event.target.value);
    const selectedGame = this.props.games[event.target.value];
    const gameData = selectedGame.shotData.map((shot) => {
      let { locX, locY, ...details } = shot;
      if (locX < 0) {
        locX = Math.abs(locX) + 250;
      } else {
        locX = 250 - locX;
      }

      locY = 415 - locY;

      return {
        details,
        locX,
        locY,
      };
    });


    const elements = document.getElementsByClassName('shot-point');
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i].parentNode.removeChild(elements[i]);
    }


    console.log(gameData);
    this.displayShots(gameData);


    // this.displayShots(selectedGame.shotData);

    // selectedGame.shotData = this.convertShotData(selectedGame.shotData);
    this.setState({ selectedGame });
  }

  /**
   * Display shots in d3 here
   *
   * @param {number[][]} shots
   *
   * @memberOf CourtHeatmap
   */
  displayShots(shots) {
    const svg = d3.select(document.getElementById('svg-court'));
    // const dataset = shots.map(shot => [`${shot.locX}`, `${shot.locY}`]);
    // filter dataset into scored and not scored
    const scoredShots = [];
    const missedShots = [];

    shots.forEach((shot) => {
      let seconds = shot.details.secondsRemaining;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (shot.details.eventType === 'Made Shot') {
        scoredShots.push([`${shot.locX}`, `${shot.locY}`, `Q${shot.details.period} - ${shot.details.minutesRemaining}:${seconds}`]);
      } else {
        missedShots.push([`${shot.locX}`, `${shot.locY}`, `Q${shot.details.period} - ${shot.details.minutesRemaining}:${seconds}`]);
      }
    });

    const div = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    svg.selectAll('#shot-point circle')
      .data(scoredShots)
      .enter()
      .append('circle')
      .classed('shot-point', true)
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
      .attr('r', () => 4)
      .attr('stroke', 'green')
      .attr('fill', 'green')
      .on('mouseover', (d) => {
        div.transition()
          .duration(200)
          .style('opacity', 0.9);
        div.html(`${d[2]} left`)
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        div.transition()
          .duration(500)
          .style('opacity', 0);
      });

    svg.selectAll('#shot-point circle')
      .data(missedShots)
      .enter()
      .append('circle')
      .classed('shot-point', true)
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
      .attr('r', () => 4)
      .attr('stroke', 'red')
      .attr('fill', 'red')
      .on('mouseover', (d) => {
        div.transition()
          .duration(200)
          .style('opacity', 0.9);
        div.html(`${d[2]} left`)
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        div.transition()
          .duration(500)
          .style('opacity', 0);
      });
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
        <div id="chart" />
        <select className="form-control" id="game-dropdown" onChange={this.handleChange}>
          <option>Select A Game...</option>
          {options}
        </select>
      </div>
    );
  }
}
