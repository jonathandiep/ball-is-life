import { combineReducers } from 'redux';
import PlayersReducer from './PlayersReducer';
import ActivePlayerReducer from './ActivePlayerReducer';
import TeamReducer from './TeamReducer';

// Redux application state
const rootReducer = combineReducers({
  players: PlayersReducer,
  activePlayer: ActivePlayerReducer,
  team: TeamReducer,
});

export default rootReducer;
