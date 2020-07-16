import { CHOOSE_FILM, FETCHING_MOVIES, ERROR_MOVIES, LOADING_MOVIES, GET_ACTORS, ACTORS_ERROR } from './types';

export const showFullMovieInfo = (payload) => ({
  type: CHOOSE_FILM,
  payload,
});

const getMovies = (payload) => ({
  type: FETCHING_MOVIES,
  payload,
});

const getMoviesError = (payload) => ({
  type: ERROR_MOVIES,
  payload,
});

export const startLoadingMovies = () => ({
  type: LOADING_MOVIES,
});

export const fetchMovies = () => async (dispatch, _, api) => {
  try {
    const data = await api('movies');
    dispatch(getMovies(data));
  } catch (error) {
    dispatch(getMoviesError(error));
  }
};

const getActors = (payload) => ({
  type: GET_ACTORS,
  payload,
});

const getActorsError = (payload) => ({
  type: ACTORS_ERROR,
  payload,
});

export const fetchActors = () => async (dispatch, _, api) => {
  try {
    const { data } = await api('actors');
    dispatch(getActors(data));
  } catch (error) {
    dispatch(getActorsError(error));
  }
};

export const removeMovieReducer = () => ({
  type: 'REMOVE_MOVIE_REDUCER',
});
