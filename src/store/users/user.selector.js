// export const selectCurrentUser = (state) => state.user.currentUser;

import { createSelector } from 'reselect';

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
);
