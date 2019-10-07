import { combineReducers } from "redux";
import authReducer from "./authReducer";
import workspaceReducer from "./workspaceReducer";
import projectReducer from "./projectReducer";
import teamReducer from "./teamReducer";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";
import endUserReducer from "./endUserReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  project: projectReducer,
  team: teamReducer,
  task: taskReducer,
  user: userReducer,
  endUser: endUserReducer,
  message: messageReducer
});
