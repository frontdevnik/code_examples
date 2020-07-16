export const chooseFilm = (state, payload) => {
  return {
    ...state,
    choosenFilm: payload,
    loading: false,
  };
};

export const changeSelectedMovieLikes = (state, payload) => {
  if (state.choosenFilm && state.choosenFilm.id === payload.id) {
    return {
      choosenFilm: {
        ...state.choosenFilm,
        likes: payload.likes,
      },
    };
  }
  return state;
};

export const changeSelectedMovieStars = (state, payload) => {
  if (state.choosenFilm && state.choosenFilm.id === payload.id) {
    return {
      choosenFilm: {
        ...state.choosenFilm,
        stars: payload.stars,
      },
    };
  }
  return state;
};

export const errorMovie = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload,
  };
};
