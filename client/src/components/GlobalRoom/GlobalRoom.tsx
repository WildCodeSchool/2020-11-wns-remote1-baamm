import React from 'react';
import ChatRoom from '../Room/ChatRoom';
import DynamicMenu from '../DynamicMenu/DynamicMenu';
import './GlobalRoom.style.css';

export default function GlobalRoom() {
  const videoStatus = true;
  const microStatus = true;

  return (
    <div className="roomContainer">
      <div className="leftColumn">
        <ChatRoom videoStatus={videoStatus} microStatus={microStatus} />
      </div>
      <DynamicMenu />
    </div>
  );
}
