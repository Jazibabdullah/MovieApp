// App/Redux/Actions/movieActions.js

import {
  FETCH_UPCOMING_MOVIES_REQUEST,
  FETCH_MOVIE_TRAILER_REQUEST,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_IMAGES_REQUEST,
  CLEAR_TRAILER,
  FETCH_MOVIE_SEARCH_REQUEST,
} from './types';

export const fetchUpcomingMovies = () => ({
  type: FETCH_UPCOMING_MOVIES_REQUEST,
});

export const fetchMovieTrailer = movieId => ({
  type: FETCH_MOVIE_TRAILER_REQUEST,
  payload: movieId,
});

export const fetchMovieDetails = movieId => ({
  type: FETCH_MOVIE_DETAILS_REQUEST,
  payload: movieId,
});

export const fetchMovieImages = movieId => ({
  type: FETCH_MOVIE_IMAGES_REQUEST,
  payload: movieId,
});

export const clearTrailer = () => ({
  type: CLEAR_TRAILER,
});

// Add movie search action creator
export const fetchMovieSearch = query => ({
  type: FETCH_MOVIE_SEARCH_REQUEST,
  payload: query,
});
