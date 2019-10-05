import { GET_PROJECTS, ADD_PROJECT, UPDATE_PROJECT } from "./types";

export const getAllProjectsAction = projects => dispatch => {
  dispatch({
    type: GET_PROJECTS,
    payload: projects
  });
};

export const addProjectAction = project => dispatch => {
  dispatch({
    type: ADD_PROJECT,
    payload: project
  });
};
