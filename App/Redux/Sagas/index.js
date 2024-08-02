import {all, call} from 'redux-saga/effects';
import {watchFetchMovies} from './MovieSagas'; // Your saga file for fetching movies

function* rootSaga() {
  yield all([
    call(watchFetchMovies),
    // add other watchers here
  ]);
}

export default rootSaga;
