import { SORT_BY_LIKES, SORT_BY_RATING, RESET_FILTERS, SEARCH_BY_NAME } from './types';

export const sorByLikes = () => ({
  type: SORT_BY_LIKES,
});

export const sortByRating = () => ({
  type: SORT_BY_RATING,
});

export const resetSorting = () => ({
  type: RESET_FILTERS,
});

export const searchByName = (payload) => ({
  type: SEARCH_BY_NAME,
  payload,
});
