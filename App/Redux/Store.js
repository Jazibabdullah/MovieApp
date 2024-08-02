// App/Redux/Store.js

import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import movieReducer from './Reducers/MovieReducer'; // Ensure correct path and import
import {
  watchFetchUpcomingMovies,
  watchFetchMovieTrailer,
  watchFetchMovieDetails,
  watchFetchMovieImages,
  watchFetchMovieSearch,
} from './Sagas/MovieSagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine reducers with the correct key
const rootReducer = combineReducers({
  movie: movieReducer, // Ensure this key is 'movie' as accessed in WatchScreen
  // Add other reducers here if needed
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the saga middleware
sagaMiddleware.run(watchFetchUpcomingMovies);
sagaMiddleware.run(watchFetchMovieTrailer);
sagaMiddleware.run(watchFetchMovieDetails);
sagaMiddleware.run(watchFetchMovieImages);
sagaMiddleware.run(watchFetchMovieSearch);

export default store;
