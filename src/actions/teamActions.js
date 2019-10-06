import { GET_TEAMS, ADD_TEAM, UPDATE_TEAM } from "./types";

export const getAllTeamsAction = teams => async dispatch => {
  dispatch({
    type: GET_TEAMS,
    payload: teams
  });
};

export const addTeamAction = team => async dispatch => {
  dispatch({
    type: ADD_TEAM,
    payload: team
  });
};

export const updateTeamAction = team => async dispatch => {
  dispatch({
    type: UPDATE_TEAM,
    payload: team
  });
};
