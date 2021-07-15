import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/Authentification/Login/Login';
import Register from './components/Authentification/Register/Register';
import Profile from './components/Profile/profile.component';
import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import MeetUp from './components/MeetUp/MeetUp';
import GlobalRoom from './components/GlobalRoom/GlobalRoom';

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user.id) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <NavBar currentUser={currentUser} />

      <div className="pageContainer">
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path="/room" exact component={MeetUp} />
          <Route path="/room/:roomID">
            <GlobalRoom />
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </>
  );
}
