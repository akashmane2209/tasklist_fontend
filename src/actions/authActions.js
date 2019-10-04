import { LOGIN, LOGOUT } from "./types";
import { saveUser, deleteUser } from "../apis/storage";

export const loginAction = (user, token) => async dispatch => {
  try {
    saveUser(user._id, token);
    dispatch({
      type: LOGIN,
      payload: { user, token }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutAction = () => async dispatch => {
  try {
    deleteUser();
    dispatch({
      type: LOGOUT
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
