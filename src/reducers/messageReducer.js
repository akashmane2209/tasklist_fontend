import { ADD_MESSAGE, GET_MESSAGES } from "../actions/types";

const defaultState = {
  message: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        message: [...action.payload]
      };
    case ADD_MESSAGE:
      return {
        message: [...state.message, { ...action.payload }]
      };
    default:
      return state;
  }
};
