import { CHOOSE_FILM, CHANGE_SELECTED_MOVIE_LIKES, CHANGE_SELECTED_MOVIE_STARS, ERROR_MOVIE, REMOVE_MOVIE_REDUCER } from './types';
import { chooseFilm, changeSelectedMovieLikes, changeSelectedMovieStars, errorMovie } from './helpers';

const initialState = {
  choosenFilm: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHOOSE_FILM:
      return chooseFilm(state, action.payload);
    case CHANGE_SELECTED_MOVIE_LIKES:
      return changeSelectedMovieLikes(state, action.payload);
    case CHANGE_SELECTED_MOVIE_STARS:
      return changeSelectedMovieStars(state, action.payload);
    case ERROR_MOVIE:
      return errorMovie(state, action.payload);
    case REMOVE_MOVIE_REDUCER:
      return initialState;
    default:
      return state;
  }
}
