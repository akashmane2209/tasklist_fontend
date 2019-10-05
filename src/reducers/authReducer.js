import { LOGIN, LOGOUT } from "../actions/types";

const defaultState = {
  user: null,
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      state = { ...action.payload };
      return state;
    case LOGOUT:
      return (state = {
        user: null,
        token: null
      });
    default:
      return state;
  }
};
