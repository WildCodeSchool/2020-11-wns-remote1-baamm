import React from 'react';
import ChatVideo from '../Room/ChatVideo';
import DynamicMenu from '../DynamicMenu/DynamicMenu';
import './GlobalRoom.style.css';

export default function GlobalRoom() {
  return (
    <div className="roomContainer">
      <div className="leftColumn">
        <ChatVideo />
      </div>
      <DynamicMenu />
    </div>
  );
}
