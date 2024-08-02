// App/res/api.js

import axios from 'axios';

const API_KEY = 'd5eda4590aa8a208cb8e33c791678b2a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchUpcomingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  );
  return response.data;
};

export const fetchMovieTrailerApi = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  );
  return response.data;
};

export const fetchMovieDetailsApi = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );
  return response.data;
};

export const fetchMovieImagesApi = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`,
  );
  return response.data;
};

// Function to fetch movie search results
export const fetchMovieSearchApi = async query => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}`,
  );
  return response.data;
};
export const fetchPopularMoviesApi = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  );
  return response.data;
};
