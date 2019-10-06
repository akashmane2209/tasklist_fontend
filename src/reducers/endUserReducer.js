const defaultState = {
  endUserProject: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "USER_PROJECT":
      return {
        endUserProject: [...action.payload]
      };
    default:
      return state;
  }
};
