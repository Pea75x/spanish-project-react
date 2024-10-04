import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = (user) => ({
  type: USER_ACTION_TYPES.SET_CURRENT_USER,
  payload: user
});

// export const createAction = (type, payload) => ({ type, payload });
