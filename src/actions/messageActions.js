import { ADD_MESSAGE, GET_MESSAGES } from "./types";

export const getAllMessagesAction = messages => dispatch => {
  dispatch({
    type: GET_MESSAGES,
    payload: messages
  });
};

export const addMessageAction = message => dispatch => {
  dispatch({
    type: ADD_MESSAGE,
    payload: message
  });
};
