import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginOut } from '../../redux/user/action-creator';
import './HomePage.scss';

export const HomePage = () => {
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
    <nav className="home__nav">
      <ul className="home__ul-list">
        <Link to="/projects">
          <input className="lf--submit" type="submit" value="ARCHITECTURE" />
        </Link>
        {!userLogged.typeUser ? (
          <>
            <li className="home__ul-list">
              <Link to="/login">
                <input className="lf--submit" type="submit" value="LOGIN" />
              </Link>
            </li>
            <li className="home__ul-list">
              <Link to="/register">
                <input className="lf--submit" type="submit" value="REGISTER" />
              </Link>
            </li>
          </>
        ) : (
          <li className="home__ul-list">
            <button type="reset" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
  return template;
};
