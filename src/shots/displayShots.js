import * as d3 from 'd3';
// import { hexbin } from 'd3-hexbin';

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

  // Display scored shots
  svg.selectAll('#shot-point circle')
    .data(scoredShots)
    .enter()
    .append('circle')
    .classed('shot-point', true)
    .attr('cx', d => d[0])
    .attr('cy', d => d[1])
    .attr('r', () => 5)
    .attr('stroke', 'green')
    // .attr('fill', 'green')
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

  // Display missed shots (one part of a cross, which is a diagonal line)
  svg.selectAll('#shot-point')
    .data(missedShots)
    .enter()
    .append('line')
    .classed('shot-point', true)
    .attr('x1', d => Number(d[0]) - 5)
    .attr('y1', d => Number(d[1]) - 5)
    .attr('x2', d => Number(d[0]) + 5)
    .attr('y2', d => Number(d[1]) + 5)
    .attr('stroke', 'red')
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

  // Display missed shots (another part of a cross, which is a diagonal line)
  svg.selectAll('#shot-point')
    .data(missedShots)
    .enter()
    .append('line')
    .classed('shot-point', true)
    .attr('x1', d => Number(d[0]) + 5)
    .attr('y1', d => Number(d[1]) - 5)
    .attr('x2', d => Number(d[0]) - 5)
    .attr('y2', d => Number(d[1]) + 5)
    .attr('stroke', 'red')
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
  // hexbin();
  return shots;
}
