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

    case "CHANGE_FLAG":
      let tasks = [...state.task];
      let task = tasks.find(task => task._id === actions.payload);
      task = { ...task, flag: 0, priority: "Completed" };
      tasks = state.task.map(t => {
        return t._id === task._id ? task : t;
      });
      return {
        task: tasks
      };
    default:
      return state;
  }
};
