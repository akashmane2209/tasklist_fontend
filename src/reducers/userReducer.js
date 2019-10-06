import { GET_USERS, ADD_USER } from "../actions/types";

const defaultState = {
  user: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        user: [...action.payload]
      };
    case ADD_USER:
      return {
        user: [...state.user, action.payload]
      };
    default:
      return state;
  }
};
