const AUTH = "AUTH";
const SELECTEDCONTACT = "SELECTEDCONTACT";
const LOGOUT = "LOGOUT";

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      return {
        isLoaded: action.isLoaded,
        authenticated: action.authenticated,
        jwt: action.jwt,
        userId: action.userId,
        userName: action.userName,
        userImage: action.userImage,
      };
    case SELECTEDCONTACT: {
      const { id_uid, person_name, person_image } = action.selectedContact;
      const newState = Object.assign({}, state);

      newState.selectedContact = {
        id_uid,
        person_name,
        person_image,
      };
      return newState;
    }
    case LOGOUT: {
      return {
        isLoaded: action.isLoaded,
        authenticated: action.authenticated,
        jwt: action.jwt,
        userId: action.userId,
        userName: action.userName,
        userImage: action.userImage,
        selectedContact: action.selectedContact,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
