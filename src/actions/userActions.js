import { GET_USERS, ADD_USER } from "./types";

export const getAllUsersActions = users => async dispatch => {
  dispatch({
    type: GET_USERS,
    payload: users
  });
};

export const addUserAction = user => async dispatch => {
  dispatch({
    type: ADD_USER,
    payload: user
  });
};
