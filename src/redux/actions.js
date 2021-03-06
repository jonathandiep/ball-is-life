// Action used to retrieve list of players (for dropdown)
export const RETRIEVE_PLAYERS = 'RETRIEVE_PLAYERS';
export const RETRIEVE_PLAYERS_STORAGE = 'RETRIEVE_PLAYERS_STORAGE';

// Actions used for a player detail
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const GET_PLAYER_DETAILS = 'GET_PLAYER_DETAILS';
export const GET_PLAYER_SHOTS = 'GET_PLAYER_SHOTS';
export const RESET_ACTIVE_PLAYER = 'RESET_ACTIVE_PLAYER';
export const RETRIEVE_PLAYER_STORAGE = 'RETRIEVE_PLAYER_STORAGE';

// Actions used to manage team
export const SAVE_PLAYER = 'SAVE_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';

/**
 *  Below are action creators, which are functions that create actions
 */

// Gets player data from json file (will later be extracted to backend)
export function retrievePlayers(payload) {
  return {
    type: RETRIEVE_PLAYERS,
    payload,
  };
}

// Gets play data from localStorage if it exists
export function retrievePlayersStorage(players) {
  return {
    type: RETRIEVE_PLAYERS_STORAGE,
    payload: players,
  };
}

export function selectPlayer(player) {
  return {
    type: SELECT_PLAYER,
    payload: player,
  };
}

export function getPlayerDetails(payload) {
  return {
    type: GET_PLAYER_DETAILS,
    payload,
  };
}

export function getPlayerShots(payload) {
  return {
    type: GET_PLAYER_SHOTS,
    payload,
  };
}

export function resetActivePlayer() {
  return {
    type: RESET_ACTIVE_PLAYER,
  };
}

export function retrievePlayerStorage(player) {
  return {
    type: RETRIEVE_PLAYER_STORAGE,
    payload: player,
  };
}

export function savePlayer(player) {
  return {
    type: SAVE_PLAYER,
    payload: player,
  };
}

export function deletePlayer(player) {
  return {
    type: DELETE_PLAYER,
    payload: player,
  };
}

