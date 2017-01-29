const players = require('nba/data/players.json');

import { RETRIEVE_PLAYERS } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case RETRIEVE_PLAYERS:
      return players;
    default:
      return state;
  }
}