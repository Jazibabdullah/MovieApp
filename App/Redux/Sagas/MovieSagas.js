// App/Redux/Sagas/movieSagas.js

import {takeLatest, call, put} from 'redux-saga/effects';
import {
  FETCH_UPCOMING_MOVIES_REQUEST,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  FETCH_UPCOMING_MOVIES_FAILURE,
  FETCH_MOVIE_TRAILER_REQUEST,
  FETCH_MOVIE_TRAILER_SUCCESS,
  FETCH_MOVIE_TRAILER_FAILURE,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
  FETCH_MOVIE_IMAGES_REQUEST,
  FETCH_MOVIE_IMAGES_SUCCESS,
  FETCH_MOVIE_IMAGES_FAILURE,
  FETCH_MOVIE_SEARCH_REQUEST,
  FETCH_MOVIE_SEARCH_SUCCESS,
  FETCH_MOVIE_SEARCH_FAILURE,
} from '../Actions/types';
import {
  fetchUpcomingMovies,
  fetchMovieTrailerApi,
  fetchMovieDetailsApi,
  fetchMovieImagesApi,
  fetchMovieSearchApi,
} from '../../res/api';

function* fetchMovies() {
  try {
    const movies = yield call(fetchUpcomingMovies);
    yield put({type: FETCH_UPCOMING_MOVIES_SUCCESS, payload: movies.results});
  } catch (e) {
    yield put({type: FETCH_UPCOMING_MOVIES_FAILURE, payload: e.message});
  }
}

function* fetchTrailer(action) {
  try {
    const trailer = yield call(fetchMovieTrailerApi, action.payload);
    const trailerUrl = trailer.results.length
      ? `https://www.youtube.com/watch?v=${trailer.results[0].key}`
      : '';
    yield put({type: FETCH_MOVIE_TRAILER_SUCCESS, payload: trailerUrl});
  } catch (e) {
    yield put({type: FETCH_MOVIE_TRAILER_FAILURE, payload: e.message});
  }
}

function* fetchMovieDetails(action) {
  try {
    const details = yield call(fetchMovieDetailsApi, action.payload);
    yield put({type: FETCH_MOVIE_DETAILS_SUCCESS, payload: details});
  } catch (e) {
    yield put({type: FETCH_MOVIE_DETAILS_FAILURE, payload: e.message});
  }
}

function* fetchMovieImages(action) {
  try {
    const images = yield call(fetchMovieImagesApi, action.payload);
    yield put({type: FETCH_MOVIE_IMAGES_SUCCESS, payload: images.backdrops});
  } catch (e) {
    yield put({type: FETCH_MOVIE_IMAGES_FAILURE, payload: e.message});
  }
}

// Saga for fetching movie search results
function* fetchMovieSearch(action) {
  try {
    const searchResults = yield call(fetchMovieSearchApi, action.payload);
    console.log(searchResults);
    yield put({
      type: FETCH_MOVIE_SEARCH_SUCCESS,
      payload: searchResults.results,
    });
  } catch (e) {
    yield put({type: FETCH_MOVIE_SEARCH_FAILURE, payload: e.message});
  }
}

export function* watchFetchUpcomingMovies() {
  yield takeLatest(FETCH_UPCOMING_MOVIES_REQUEST, fetchMovies);
}

export function* watchFetchMovieTrailer() {
  yield takeLatest(FETCH_MOVIE_TRAILER_REQUEST, fetchTrailer);
}

export function* watchFetchMovieDetails() {
  yield takeLatest(FETCH_MOVIE_DETAILS_REQUEST, fetchMovieDetails);
}

export function* watchFetchMovieImages() {
  yield takeLatest(FETCH_MOVIE_IMAGES_REQUEST, fetchMovieImages);
}

// Watcher saga for fetching movie search
export function* watchFetchMovieSearch() {
  yield takeLatest(FETCH_MOVIE_SEARCH_REQUEST, fetchMovieSearch);
}
