import React, { Component } from 'react';

export default class Player extends Component {
  render() {
    return (
      <div>
        Player ID: {this.props.params.playerId}
      </div>
    )
  }
}