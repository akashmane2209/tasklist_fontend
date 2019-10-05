import { GET_TEAMS, ADD_TEAM } from "./types";

export const getAllTeamsAction = teams => async dispatch => {
  dispatch({
    type: GET_TEAMS,
    payload: teams
  });
};

export const addTeamActions = team => async dispatch => {
  dispatch({
    type: ADD_TEAM,
    payload: team
  });
};
