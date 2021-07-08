import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/Authentification/Login/Login';
import Register from './components/Authentification/Register/Register';
import Profile from './components/Profile/profile.component';
import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Teacher from './components/Teacher/Teacher';
import DynamicMenu from './components/DynamicMenu/DynamicMenu';
import Student from './components/Student/Student';
import MeetUp from './components/MeetUp/MeetUp';

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
          <Route exact path="/chatroom" component={Student} />
          <Route path="/room" exact component={MeetUp} />
          <Route path="/room/:roomID">
            <div className="roomContainer">
              <Teacher />
              <DynamicMenu />
            </div>
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </>
  );
}
