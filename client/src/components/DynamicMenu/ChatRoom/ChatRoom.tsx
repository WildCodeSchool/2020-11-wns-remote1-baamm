import React, { useState } from 'react';
import socket from '../../../socket/Socket';
import './ChatRoom.style.css';
import dataEnDur from './ChatDataEnDur';

export default function ChatRoom() {
  const currentUserID = socket.id;
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="toolsContainer">
      <div className="messagesContainer">
        <ol className="listMessages">
          {dataEnDur.map((data) => (
            <li className={data.userTalking === currentUserID ? 'message my-message' : 'message receive-message'}>
              <p className="userName">{data.userTalking === currentUserID ? 'Moi' : data.userTalking}</p>
              <p className="messageBody">{data.messageBody}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="inputBlock">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write message ..."
          className="inputMessage"
        />
        <button type="button" onClick={() => console.log(newMessage)} className="sendButton">
          Envoyer
        </button>
      </div>
    </div>
  );
}
