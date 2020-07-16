export const getActors = (state, payload) => {
  return { ...state, loading: false, actors: payload.payload };
};

export const getActorsError = (state, payload) => {
  return { ...state, loading: false, error: payload };
};
