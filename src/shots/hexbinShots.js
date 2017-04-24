import { select, scaleSequential, interpolateLab } from 'd3';
import * as d3hexbin from 'd3-hexbin';

function calculateFieldGoal(hexbin) {
  let scored = 0;
  let missed = 0;

  for (let shot = 0; shot < hexbin.length; shot++) {
    if (hexbin[shot][2] === 'Made Shot') {
      scored++;
    } else {
      missed++;
    }
  }

  return {
    scored,
    missed,
  };
}

function fieldGoalPercentage(hexbin) {
  let scored = 0;
  let missed = 0;

  for (let shot = 0; shot < hexbin.length; shot++) {
    if (hexbin[shot][2] === 'Made Shot') {
      scored++;
    } else {
      missed++;
    }
  }

  return (scored / (scored + missed)) * 100;
}

export function fieldGoalShots(shots) {
  const div = select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  const svg = select(document.getElementById('svg-court'));
  const g = svg.append('g')
    .attr('transform', 'translate(0, 0)');

  const hexbin = d3hexbin.hexbin()
    .radius(20)
      .x(d => d[0])
      .y(d => d[1]);

  const color = scaleSequential(interpolateLab('white', 'steelblue'))
    .domain([0, 0.6]);

  const shotLocations = shots.map(shot => [`${shot.locX}`, `${shot.locY}`, `${shot.eventType}`]);

  g.selectAll('path')
    .data(hexbin(shotLocations))
    .enter()
    .append('path')
    .classed('hexbin', true)
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .attr('d', hexbin.hexagon())
    .attr('stroke-width', '2px')
    .attr('fill', (d) => {
      const shotsData = calculateFieldGoal(d);
      return color(shotsData.scored / (shotsData.scored + shotsData.missed));
    })
    .attr('fill-opacity', 0.8)
    .on('mouseover', (d) => {
      const shotsData = calculateFieldGoal(d);
      div.transition()
        .duration(200)
        .style('opacity', 0.9);
      div.html(`${Math.floor(fieldGoalPercentage(d))}%<br>
        ${shotsData.scored} / ${shotsData.scored + shotsData.missed} shots`)
        .style('top', `${event.pageY - 10}px`)
        .style('left', `${event.pageX + 10}px`);
    })
    .on('mouseout', () => {
      div.transition()
        .duration(500)
        .style('opacity', 0);
    });
}

export function fieldGoalAttempts(shots) {
  const div = select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  const svg = select(document.getElementById('svg-court'));
  const g = svg.append('g')
    .attr('transform', 'translate(0, 0)');

  const hexbin = d3hexbin.hexbin()
    .radius(20)
      .x(d => d[0])
      .y(d => d[1]);

  const color = scaleSequential(interpolateLab('white', 'steelblue'))
    .domain([0, 15]);

  const shotLocations = shots.map(shot => [`${shot.locX}`, `${shot.locY}`]);

  g.selectAll('path')
    .data(hexbin(shotLocations))
    .enter()
    .append('path')
    .classed('hexbin', true)
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .attr('d', hexbin.hexagon())
    .attr('stroke-width', '2px')
    .attr('fill', d => color(d.length))
    .attr('fill-opacity', 0.8)
    .on('mouseover', (d) => {
      div.transition()
        .duration(200)
        .style('opacity', 0.9);
      div.html(`${d.length} shots`)
        .style('top', `${event.pageY - 10}px`)
        .style('left', `${event.pageX + 10}px`);
    })
    .on('mouseout', () => {
      div.transition()
        .duration(500)
        .style('opacity', 0);
    });
}
