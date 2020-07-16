import { changeLikes, setRatingStars, sortByLikes, sortByRating, resetFilters, searchByName, editMovie, deleteMovie, getMovies, loadingMovies, errorMovies } from './helpers';

const initialState = {
  movies: null,
  updatedFilms: null,
  loading: true,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LIKES':
      return changeLikes(state, action);
    case 'SET_RATING_STARS':
      return setRatingStars(state, action);
    case 'SORT_BY_LIKES':
      return sortByLikes(state);
    case 'SORT_BY_RATING':
      return sortByRating(state);
    case 'RESET_FILTERS':
      return resetFilters(state);
    case 'SEARCH_BY_NAME':
      return searchByName(state, action);
    case 'EDIT_MOVIE':
      return editMovie(state, action);
    case 'DELETE_MOVIE':
      return deleteMovie(state, action);
    case 'FETCHING_MOVIES':
      return getMovies(state, action);
    case 'LOADING_MOVIES':
      return loadingMovies(state);
    case 'ERROR_MOVIES':
      return errorMovies(state, action);
    default:
      return state;
  }
}
