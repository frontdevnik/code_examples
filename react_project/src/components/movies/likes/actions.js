import { CHANGE_LIKES, CHANGE_SELECTED_MOVIE_LIKES } from './types';

export const changeLikes = (payload) => ({
  type: CHANGE_LIKES,
  payload,
});

const changeMovieLikes = (payload) => ({
  type: CHANGE_SELECTED_MOVIE_LIKES,
  payload,
});

export const changeSelectedMovieLikes = (payload) => async (dispatch, _, api) => {
  await api(`movies/${payload.id}`, 'put', payload);
  dispatch(changeMovieLikes(payload));
};
