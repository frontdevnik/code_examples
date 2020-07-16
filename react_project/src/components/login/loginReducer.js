import { ALLOW_LOGIN } from './types';

const initialState = {
  isLoggin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALLOW_LOGIN:
      return {
        isLoggin: !state.isLoggin,
      };
    default:
      return state;
  }
};
