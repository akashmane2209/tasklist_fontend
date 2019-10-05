import { combineReducers } from "redux";
import authReducer from "./authReducer";
import workspaceReducer from "./workspaceReducer";
import projectReducer from "./projectReducer";
import teamReducer from "./teamReducer";
import taskReducer from "./taskReducer";
export default combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  project: projectReducer,
  team: teamReducer,
  task: taskReducer
});
