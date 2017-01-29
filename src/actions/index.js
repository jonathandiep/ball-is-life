// Action used to retrieve list of players (for dropdown)
export const RETRIEVE_PLAYERS = 'RETRIEVE_PLAYERS';

// Actions used for a player detail
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const GET_PLAYER_DETAILS = 'GET_PLAYER_DETAILS';
export const GET_PLAYER_SHOTS = 'GET_PLAYER_SHOTS';

// Actions used to manage team
export const ADD_PLAYER = 'ADD_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';

export function retrievePlayers() {
  return {
    type: RETRIEVE_PLAYERS
  }
}

export function selectPlayer(player) {
  return {
    type: SELECT_PLAYER,
    payload: player
  }
}

export function getPlayerDetails(data) {
  return {
    type: GET_PLAYER_DETAILS,
    payload: data
  }
}

export function getPlayerShots(data) {
  return {
    type: GET_PLAYER_SHOTS,
    payload: data
  }
}

export function addPlayer(player) {
  return {
    type: ADD_PLAYER,
    payload: player
  }
}

export function deletePlayer(player) {
  return {
    type: DELETE_PLAYER,
    payload: player
  }
}