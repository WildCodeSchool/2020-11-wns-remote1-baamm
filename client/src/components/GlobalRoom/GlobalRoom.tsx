import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Teacher from '../Teacher/Teacher';
import socket from '../../socket/Socket';
import DynamicMenu from '../DynamicMenu/DynamicMenu';
import { useTheme } from '../../context/AppContext';
import AuthService from '../../services/auth.service';

export default function GlobalRoom() {
  const { roomID } = useTheme()!;
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    socket.emit('join Room', roomID, currentUser);
  }, [roomID]);

  return (
    <div className="roomContainer">
      <Teacher />
      <DynamicMenu />
    </div>
  );
}
