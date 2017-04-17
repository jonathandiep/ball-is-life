import {
  SELECT_PLAYER,
  GET_PLAYER_DETAILS,
  GET_PLAYER_SHOTS,
  RESET_ACTIVE_PLAYER,
  RETRIEVE_PLAYER_STORAGE,
} from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case SELECT_PLAYER:
    case RETRIEVE_PLAYER_STORAGE:
      return action.payload;
    case GET_PLAYER_DETAILS:
      return Object.assign({}, state, action.payload);
    case GET_PLAYER_SHOTS:
      return Object.assign({}, state, action.payload);
    case RESET_ACTIVE_PLAYER:
      return {};
    default:
      return state;
  }
}
