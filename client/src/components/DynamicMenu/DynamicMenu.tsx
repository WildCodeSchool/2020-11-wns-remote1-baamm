import './DynamicMenu.style.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCommentAlt,
  faUsers,
  faAngleLeft,
  faAngleRight,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import Participants from '../Participants/Participants';
import WaitingQueue from '../WaitingQueue/WaitingQueue';
import ChatRoom from '../ChatRoom/ChatRoom';
import '../Teacher/Teacher.style.css';

export default function DynamicMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    if (isOpen === false) {
      setIsOpen(true);
    }
  }

  return (
    <div className={isOpen ? 'container openedContainer' : 'container closedContainer'}>
      <Router>
        <div className={isOpen ? 'navToolsBar' : 'closedNavbar'}>
          {isOpen
            ? <FontAwesomeIcon icon={faAngleRight} className="linkTest" onClick={() => setIsOpen(false)} />
            : <FontAwesomeIcon icon={faAngleLeft} className="linkTest" onClick={() => setIsOpen(true)} />}
          <Link to="/chat" onClick={openMenu} className="linkTest">
            <FontAwesomeIcon icon={faCommentAlt} />
          </Link>
          <Link to="/waitingqueue" onClick={openMenu} className="linkTest">
            <FontAwesomeIcon icon={faClock} />
          </Link>
          <Link to="/participants" onClick={openMenu} className="linkTest">
            <FontAwesomeIcon icon={faUsers} />
          </Link>
          <FontAwesomeIcon icon={faCog} className={isOpen ? 'hiddenButton' : 'linkTest optionsIcon'} />
        </div>
        {isOpen ? (
          <Switch>
            <Route path="/waitingqueue">
              <WaitingQueue />
            </Route>
            <Route path="/chat">
              <ChatRoom />
            </Route>
            <Route path="/participants">
              <Participants />
            </Route>
          </Switch>
        ) : null}

      </Router>
    </div>
  );
}
