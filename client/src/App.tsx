import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/Authentification/Login/Login';
import Register from './components/Authentification/Register/Register';
import Profile from './components/Profile/profile.component';
import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import MeetUp from './components/MeetUp/MeetUp';
import Teacher from './components/Teacher/Teacher';

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

      <div>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/meet" component={MeetUp} />
          <Route exact path="/room" component={Teacher} />
        </Switch>
      </div>
    </>
  );
}
