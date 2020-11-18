import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Participants from './Participants';
import WaitingQueue from './WaitingQueue';
import Chat from './Chat';
import AskTalkingButton from './AskTalkingButton';
import './Teacher.style.css';


function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)


  return (
    <div className="mainContainer">
      <div className="leftColumn" /*style={showToolsContain ? { flex: 3 } : { flex: 9 }}*/>
        <AskTalkingButton />
      </div>
      <div className="rightColumn" >
        {/*<button onClick={() => setShowToolsContain(!showToolsContain)}>Put</button>*/}
        {/*<div className={showToolsContain ? "toolsContainerOpen" : "toolsContainerClose"} /*style={showToolsContain ? { flex: 3 } : { flex: 1 }}>
        </div>*/}

        <Router>
          <div className="navToolsBar">
            <Link to="/chat">
              <button>img 1</button>
            </Link>
            <Link to="/waitingqueue">
              <button>img 2</button>
            </Link>
            <Link to="/participants">
              <button>img 3</button>
            </Link>
          </div>
          <div ></div>
          <Switch>
            <Route path="/waitingqueue">
              <WaitingQueue />
            </Route>
            <Route path="/chat">
              <Chat />
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
