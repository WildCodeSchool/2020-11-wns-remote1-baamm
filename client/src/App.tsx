import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import ChatContext from './context/ChatContext';
import Teacher from './components/Teacher/Teacher';
import DynamicMenu from './components/DynamicMenu/DynamicMenu';
import useChat from './components/UseChat/useChat';
import './App.css';
import LoginPage from './components/LoginPage/Login';

function Home() {
  return (
    <div className="homeContainer">
      <p>Bienvenue sur le site des BAAMM</p>
    </div>
  );
}

function App() {
  const roomId = 'Test-Room';
  const { messages, sendMessage } = useChat(roomId);
  return (
    <Router>
      <ChatContext.Provider value={{ messages, sendMessage }}>
        <div>
          <nav>
            <ul className="navbar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/chatroom">ChatRoom</Link>
              </li>
              <li>
                <Link to="/sign">Connexion / Inscription</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/sign">
              <LoginPage />
            </Route>
            <Route path="/chatroom">
              <div className="App">
                <Teacher />
                <DynamicMenu />
              </div>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </ChatContext.Provider>
    </Router>
  );
}

export default App;
