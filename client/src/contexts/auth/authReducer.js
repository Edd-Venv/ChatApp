const AUTH = "AUTH";
const SELECTEDCONTACT = "SELECTEDCONTACT";
const RESETSELECTEDCONTACT = "RESETSELECTEDCONTACT";
const LOGOUT = "LOGOUT";

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH: {
      const newState = Object.assign({}, state);
      newState.isLoaded = action.isLoaded;
      newState.authenticated = action.authenticated;
      newState.jwt = action.jwt;
      newState.userId = action.userId;
      newState.userName = action.userName;
      newState.userImage = action.userImage;
      return newState;
    }
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
    case RESETSELECTEDCONTACT: {
      const newState = Object.assign({}, state);
      newState.selectedContact = {
        id_uid: "dummy",
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
