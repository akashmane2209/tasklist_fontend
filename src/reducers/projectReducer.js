import { ADD_PROJECT, GET_PROJECTS } from "../actions/types";

const defaultState = {
  project: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        project: [...action.payload]
      };
    case ADD_PROJECT:
      return {
        project: [...state.project, action.payload]
      };
    default:
      return state;
  }
};
