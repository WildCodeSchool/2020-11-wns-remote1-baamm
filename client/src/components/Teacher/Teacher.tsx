import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCommentAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
// import Webcam from 'react-webcam';
import Participants from '../Participants/Participants';
import WaitingQueue from '../WaitingQueue/WaitingQueue';
import ChatRoom from '../ChatRoom/ChatRoom';
import './Teacher.style.css';

function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)

  return (
    <div className="mainContainer">
      <div className="leftColumn">
        {/* <Webcam style={{ borderRadius: 45 }} /> */}
      </div>
      <div className="rightColumn">

        <Router>
          <div className="navToolsBar">
            <Link to="/chat" className="linkTest">
              <FontAwesomeIcon icon={faCommentAlt} />
            </Link>
            <Link to="/waitingqueue" className="linkTest">
              <FontAwesomeIcon icon={faClock} />
            </Link>
            <Link to="/participants" className="linkTest">
              <FontAwesomeIcon icon={faUsers} />
            </Link>
          </div>
          <div />
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
        </Router>
      </div>
    </div>
  );
}

export default Teacher;
