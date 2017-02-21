import { RETRIEVE_PLAYERS, RETRIEVE_PLAYERS_STORAGE } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case RETRIEVE_PLAYERS:
    case RETRIEVE_PLAYERS_STORAGE:
      return action.payload;
    default:
      return state;
  }
}