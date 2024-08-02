import {combineReducers} from 'redux';
// Import your reducers here
import movieReducer from './MovieReducer';

const rootReducer = combineReducers({
  movie: movieReducer,
  // other reducers can be added here
});

export default rootReducer;
