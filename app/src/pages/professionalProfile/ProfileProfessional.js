/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginOut } from '../../redux/user/action-creator';

export const ProfileProfessional = () => {
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
  console.log(userLogged);

  const template = (
    <div>
      <div>
        <h2>PROFILE PROFESSIONAL PAGE</h2>
      </div>
      <div>
        <p>{userLogged.name}</p>
      </div>
      <div>
        <Link to="/myProjects">MY PROJECTS</Link>
      </div>
      <button type="reset" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
  return template;
};
