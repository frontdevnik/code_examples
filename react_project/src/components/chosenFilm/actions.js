import { SHOW_ACTOR, CHOOSE_FILM, ERROR_MOVIE, REMOVE_MOVIE_REDUCER } from './types';

export const showActorInfo = (payload) => ({
  type: SHOW_ACTOR,
  payload,
});

const getMovie = (payload) => ({
  type: CHOOSE_FILM,
  payload,
});

const errorMovie = (payload) => ({
  type: ERROR_MOVIE,
  payload,
});

export const fetchingMovie = (id) => async (dispatch, _, api) => {
  try {
    const { data } = await api(`movies/${id}`);
    dispatch(getMovie(data));
  } catch (error) {
    dispatch(errorMovie(error));
  }
};

export const removeMovieReducer = () => ({
  type: REMOVE_MOVIE_REDUCER,
});
