/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginOut } from '../../redux/user/action-creator';
import './Header.scss';

const Header = () => {
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
  return (
    <div className="navbar">
      <div className="navbar__home">
        <Link to="/">HOME</Link>
      </div>
      <nav className="navbar__nav">
        <ul className="navbar__ul">
          <li className="navbar__ul-list">
            <Link to="/projects">PROJECTS</Link>
          </li>
          <li className="navbar__ul-list">
            <Link to="/viewer">VIEWER</Link>
          </li>
          {!userLogged.typeUser ? (
            <>
              <li className="navbar__ul-list">
                <Link to="/login">LOGIN</Link>
              </li>
              <li className="navbar__ul-list">
                <Link to="/register">REGISTER</Link>
              </li>
            </>
          ) : (
            <button
              className="navbar__logout"
              type="reset"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          )}

          <li className="navbar__ul-list">
            <Link to="/profile">PROFILE</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
