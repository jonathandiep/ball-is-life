import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';

/**
 * Display scattered points of the shots. Displays green dots for scored shots and red dots for missed shots
 *
 * @export
 * @param {any} shots: Array of shot data
 */
export function scatteredShots(shots) {
  const svg = d3.select(document.getElementById('svg-court'));
  const scoredShots = [];
  const missedShots = [];

  shots.forEach((shot) => {
    let seconds = shot.secondsRemaining;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (shot.eventType === 'Made Shot') {
      scoredShots.push([`${shot.locX}`, `${shot.locY}`, `Q${shot.period} - ${shot.minutesRemaining}:${seconds}`]);
    } else {
      missedShots.push([`${shot.locX}`, `${shot.locY}`, `Q${shot.period} - ${shot.minutesRemaining}:${seconds}`]);
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

// TODO
export function hexbinShots(shots) {
  hexbin();
  return shots;
}
