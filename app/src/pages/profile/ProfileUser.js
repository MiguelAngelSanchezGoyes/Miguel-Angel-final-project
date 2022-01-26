/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginOut } from '../../redux/user/action-creator';
import './ProfileUser.scss';

export const ProfileUser = () => {
  const { userLogged } = useSelector((state) => state.userStore);
  const [loginState, setLoginState] = useState({
    name: '',
    passwd: '',
    typeUser: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (ev) => {
    ev.preventDefault();
    dispatch(loginOut(loginState));
    navigate('/');
  };

  const template = (
    <div>
      <div>
        <h2 className="profile__title">PROFILE USER PAGE</h2>
      </div>
      <div>
        <p className="profile__name">{userLogged.name}</p>
      </div>
      {userLogged.typeUser !== 'user' ? (
        <></>
      ) : (
        <>
          <div>
            <Link to="/myProjects">
              <input className="lf--submit" type="submit" value="MY PROJECTS" />
            </Link>
          </div>
          <button type="reset" onClick={handleLogout}>
            LOGOUT
          </button>
        </>
      )}
    </div>
  );
  return template;
};
