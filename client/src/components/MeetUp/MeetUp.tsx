/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import AuthService from '../../services/auth.service';

import ListRooms from './ListRooms/ListRooms';
import CreateRoom from './CreateRoom/CreateRoom';
import JoinRoom from './JoinRoom/JoinRoom';
import './MeetUp.css';

export default function Test() {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="generalContainer">
      <div className="actionsContainer">
        {currentUser.role === 'TEACHER' && <CreateRoom />}
        <JoinRoom />
      </div>

      <ListRooms />
    </div>
  );
}
