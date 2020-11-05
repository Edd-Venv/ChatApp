const authReducer = (state, action) => {
  console.log("action authReducers", action);
  switch (action.type) {
    case "AUTH":
      return {
        isLoaded: action.isLoaded,
        authenticated: action.authenticated,
        jwt: action.jwt,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
