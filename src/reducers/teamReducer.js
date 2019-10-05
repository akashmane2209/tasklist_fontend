import { GET_TEAMS, ADD_TEAM } from "../actions/types";

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
    default:
      return state;
  }
};
