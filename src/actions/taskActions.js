import { ADD_TASK, GET_TASKS } from "./types";

export const getAllTasksAction = tasks => async dispatch => {
  dispatch({
    type: GET_TASKS,
    payload: tasks
  });
};

export const addTaskAction = task => async dispatch => {
  dispatch({
    type: ADD_TASK,
    payload: task
  });
};
