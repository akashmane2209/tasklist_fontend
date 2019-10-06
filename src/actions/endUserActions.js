export const getUserProjectsActions = projects => dispatch => {
  dispatch({
    type: "USER_PROJECT",
    payload: projects
  });
};
