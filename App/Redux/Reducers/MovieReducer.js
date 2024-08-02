// App/Redux/Reducers/MovieReducer.js

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
  CLEAR_TRAILER,
  FETCH_MOVIE_SEARCH_REQUEST,
  FETCH_MOVIE_SEARCH_SUCCESS,
  FETCH_MOVIE_SEARCH_FAILURE,
} from '../Actions/types';

const initialState = {
  loading: false,
  movies: [], // Initialize movies array
  movieDetails: {},
  movieImages: [],
  trailerUrl: '',
  error: '',
  searchResults: [], // Initialize search results array
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_UPCOMING_MOVIES_REQUEST:
    case FETCH_MOVIE_TRAILER_REQUEST:
    case FETCH_MOVIE_DETAILS_REQUEST:
    case FETCH_MOVIE_IMAGES_REQUEST:
    case FETCH_MOVIE_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload, // Update movies with the fetched data
        error: '',
      };
    case FETCH_MOVIE_TRAILER_SUCCESS:
      return {
        ...state,
        loading: false,
        trailerUrl: action.payload,
        error: '',
      };
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movieDetails: action.payload,
        error: '',
      };
    case FETCH_MOVIE_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        movieImages: action.payload,
        error: '',
      };
    case FETCH_MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: '',
      };
    case FETCH_UPCOMING_MOVIES_FAILURE:
    case FETCH_MOVIE_TRAILER_FAILURE:
    case FETCH_MOVIE_DETAILS_FAILURE:
    case FETCH_MOVIE_IMAGES_FAILURE:
    case FETCH_MOVIE_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Update error message
      };
    case CLEAR_TRAILER:
      return {
        ...state,
        trailerUrl: '',
      };
    default:
      return state;
  }
}

export default movieReducer;
