import { SET_RATING_STARS, CHANGE_SELECTED_MOVIE_STARS } from './types';

export const setStars = (payload) => ({
  type: SET_RATING_STARS,
  payload,
});

export const setRatingStars = (payload) => async (dispatch, _, api) => {
  await api(`movies/${payload.id}`, 'put', payload);
  dispatch(setStars(payload));
};

const changeMovieStars = (payload) => ({
  type: CHANGE_SELECTED_MOVIE_STARS,
  payload,
});

export const changeSelectedMovieStars = (payload) => async (dispatch, _, api) => {
  await api(`movies/${payload.id}`, 'put', payload);
  dispatch(changeMovieStars(payload));
};
