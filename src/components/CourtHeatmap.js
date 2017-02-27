// Make a heat map component here. Just pass data into it
import React, { Component } from 'react';
import { select } from 'd3';

/* eslint-disable import/prefer-default-export */
export class CourtHeatmap extends Component {
  componentDidMount() {
    const svg = select(document.getElementById('chart'))
      .append('svg')
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

    svg.append('line')
      .attr('x1', 220)
      .attr('y1', 430)
      .attr('x2', 280)
      .attr('y2', 430);
  }

  render() {
    return (
      <div className="col-md-8">
        <div id="chart" />
      </div>
    );
  }

}
