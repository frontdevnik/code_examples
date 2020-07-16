import { SHOW_ACTOR, SHOW_ACTOR_ERROR, REMOVE_ACTOR } from './types';

const showActor = (payload) => ({
  type: SHOW_ACTOR,
  payload,
});

const showActorError = (payload) => ({
  type: SHOW_ACTOR_ERROR,
  payload,
});

export const fetchingActor = (id) => async (dispatch, _, api) => {
  try {
    const { data } = await api(`actors/${id}`);
    dispatch(showActor(data));
  } catch (error) {
    dispatch(showActorError(error));
  }
};

export const removeActor = () => ({
  type: REMOVE_ACTOR,
});
