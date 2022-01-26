/* eslint-disable arrow-body-style */
import { userActionTypes } from './action-types';
import UserApi from '../../services/User.services';
import { userService } from '../../services/Login.service';

export const createUser = (user) => {
  return (dispatch) => {
    UserApi.addUser(user).then((addedUser) => {
      dispatch({
        type: userActionTypes.login,
        payload: addedUser,
      });
    });
  };
};

export const verifyUser = (user) => {
  return (dispatch) => {
    userService()
      .login(user)
      .then((loggedUser) => {
        dispatch({
          type: userActionTypes.login,
          payload: loggedUser,
        });
      });
  };
};

export const loginOut = () => {
  userService().logout();
  return { type: userActionTypes.logout };
};

export const loadUsers = () => {
  return (dispatch) => {
    UserApi.getUsers().then((listProjects) => {
      dispatch({
        type: userActionTypes.load,
        projects: listProjects,
      });
    });
  };
};

export const loginUser = (user) => {
  return {
    type: userActionTypes.login,
    payload: user,
  };
};
