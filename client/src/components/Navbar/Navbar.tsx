import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faSignOutAlt, faSignInAlt, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth.service';
import './Navbar.css';
import LogoWhite from '../../pictures/Logo_white.png';

function logOut() {
  AuthService.logout();
}

const NavBar = ({ currentUser }: any) => (
  <nav className="navBarContainer">
    <Link to="/" className="nav-link">
      <FontAwesomeIcon icon={faHome} />
      <img src={LogoWhite} alt="Logo" className="imgLogo" />
    </Link>
    <div className="conditionnal-navbar">

      {currentUser && (
        <Link to="/room" className="nav-link">
          Meets
        </Link>
      )}
    </div>

    {currentUser ? (
      <div className="nav-connected">
        <Link to="/profile" className="nav-link">
          {currentUser.firstname}
          {' '}
          {currentUser.lastname}
        </Link>
        <a href="/login" className="nav-link" onClick={logOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </a>
      </div>
    ) : (
      <div className="nav-notConnected">
        <Link to="/login" className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} />
        </Link>

        <Link to="/register" className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} />
        </Link>
      </div>
    )}
  </nav>
);

export default NavBar;
