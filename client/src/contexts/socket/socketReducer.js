const SOCKET = "SOCKET";

const socketReducer = (state, action) => {
  console.log("socketReducer", action);
  switch (action.type) {
    case SOCKET: {
      const newState = Object.assign({}, state);
      newState.socket = action.socket;
      return newState;
    }
    default:
      return state;
  }
};

export default socketReducer;
