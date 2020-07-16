export const getActors = (state) => async (dispatch, _, api) => {
  const actors = api('actors');
  return { ...state, loading: false, actors };
};
