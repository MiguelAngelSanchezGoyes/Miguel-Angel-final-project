import { userActionTypes } from './action-types';

const initialUsersState = {
  users: [],
  userLogged: {},
};

const userReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case userActionTypes.add:
      return { ...state, users: [...state.users, action.payload] };
    case userActionTypes.login:
      return { ...state, userLogged: action.payload.user };
    case userActionTypes.logout:
      return { ...state, userLogged: {} };
    default:
      return state;
  }
};

export default userReducer;
