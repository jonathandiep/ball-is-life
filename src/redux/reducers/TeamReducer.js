import { ADD_PLAYER, DELETE_PLAYER } from '../actions';

export default function(state = [], action) {
  switch(action.type) {
    case ADD_PLAYER:
      return state.concat(action.payload);
    case DELETE_PLAYER:
      return state.filter(player => player !== action.payload);
    default:
      return state;
  }
}