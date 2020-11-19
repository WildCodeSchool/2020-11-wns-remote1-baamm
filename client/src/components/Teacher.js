import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCommentAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import Participants from './Participants';
import WaitingQueue from './WaitingQueue';
import ChatRoom from './ChatRoom';
import './Teacher.style.css';


function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)


  return (
    <div className="mainContainer">
      <div className="leftColumn" /*style={showToolsContain ? { flex: 3 } : { flex: 9 }}*/>
      </div>
      <div className="rightColumn" >
        {/*<button onClick={() => setShowToolsContain(!showToolsContain)}>Put</button>*/}
        {/*<div className={showToolsContain ? "toolsContainerOpen" : "toolsContainerClose"} /*style={showToolsContain ? { flex: 3 } : { flex: 1 }}>
        </div>*/}

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
          <div ></div>
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
};

export default Teacher;
