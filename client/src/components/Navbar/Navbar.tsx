import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faSignOutAlt, faSignInAlt, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth.service';

function logOut() {
  AuthService.logout();
}

const NavBar = ({ currentUser }: any) => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link to="/" className="navbar-brand">
      <FontAwesomeIcon icon={faHome} />
    </Link>
    <div className="navbar-nav mr-auto">

      {currentUser && (
        <li className="nav-item">
          <Link to="/meet" className="nav-link">
            Meets
          </Link>
        </li>
      )}
    </div>

    {currentUser ? (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            {currentUser.fullname}
          </Link>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link" onClick={logOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </a>
        </li>
      </div>
    ) : (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        </li>
      </div>
    )}
  </nav>
);

export default NavBar;
