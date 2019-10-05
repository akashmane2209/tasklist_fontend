import { GET_TASKS, ADD_TASK } from "../actions/types";

const defaultState = {
  task: []
};

export default (state = defaultState, actions) => {
  switch (actions.type) {
    case GET_TASKS:
      return {
        task: [...actions.payload]
      };
    case ADD_TASK:
      return {
        task: [...state.task, actions.payload]
      };
    default:
      return state;
  }
};
