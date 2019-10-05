import { ADD_WORKSPACE, GET_WORKSPACES, UPDATE_WORKSPACE } from "./types";

export const addWorkspaceAction = workspace => async dispatch => {
  dispatch({
    type: ADD_WORKSPACE,
    payload: workspace
  });
};

export const getAllWorkSpacesAction = workspaces => async dispatch => {
  dispatch({
    type: GET_WORKSPACES,
    payload: workspaces
  });
};
