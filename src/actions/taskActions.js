import { ADD_TASK, GET_TASKS } from "./types";

export const getAllTasksAction = tasks => async dispatch => {
  tasks = tasks.map(task => {
    const seconds = Date.now();
    const currentDate = new Date(seconds);
    const dueDate = new Date(task.dueDate);
    const startDate = new Date(task.startDate);
    if (
      currentDate > startDate &&
      currentDate < dueDate &&
      task.priority !== "Completed"
    ) {
      task.flag = 2;
    } else if (currentDate < startDate && task.priority !== "Completed") {
      task.flag = 1;
    } else if (currentDate > dueDate && task.priority !== "Completed") {
      task.flag = 3;
      task.priority = "High";
    }
    return task;
  });
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

export const changeTaskFlagAction = taskId => async dispatch => {
  dispatch({
    type: "CHANGE_FLAG",
    payload: taskId
  });
};
