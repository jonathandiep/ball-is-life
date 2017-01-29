import { combineReducers } from 'redux';
import PlayersReducer from './PlayersReducer';
import ActivePlayerReducer from './ActivePlayerReducer';

// Redux application state
const rootReducer = combineReducers({
  players: PlayersReducer,
  activePlayer: ActivePlayerReducer
});

export default rootReducer;