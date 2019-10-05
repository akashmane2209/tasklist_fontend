import { GET_WORKSPACES, ADD_WORKSPACE } from "../actions/types";

const workspaceState = {
  workspace: []
};

export default (state = workspaceState, action) => {
  switch (action.type) {
    case GET_WORKSPACES:
      return (state = {
        workspace: [...action.payload]
      });
    case ADD_WORKSPACE:
      return {
        workspace: [...state.workspace, action.payload]
      };
    default:
      return state;
  }
};
