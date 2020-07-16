export const showActor = (state, payload) => ({
  ...state,
  loading: false,
  actor: payload,
});

export const showActorError = (state, payload) => ({
  ...state,
  loading: false,
  error: payload,
});
