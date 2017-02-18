// Make a heat map component here. Just pass data into it
import React, { Component } from 'react';
import '../styles/CourtHeatmap.css';

export class CourtHeatmap extends Component {
  render () {

    return (
      <div className="col-md-8">
        <p>Heatmap here...</p>
        <div id="chart">
        </div>
      </div>
    )
  }

}