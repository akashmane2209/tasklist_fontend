import { GET_TEAMS, ADD_TEAM, UPDATE_TEAM } from "../actions/types";

const defaultState = {
  team: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return {
        team: [...action.payload]
      };
    case ADD_TEAM:
      return {
        team: [...state.team, action.payload]
      };
    case UPDATE_TEAM:
      let teams = [...state.team];
      let team = teams.find(team => team._id === action.payload._id);
      team = { ...action.payload };
      teams = state.team.map(t => {
        return t._id === team._id ? team : t;
      });
      return {
        team: teams
      };
    default:
      return state;
  }
};
