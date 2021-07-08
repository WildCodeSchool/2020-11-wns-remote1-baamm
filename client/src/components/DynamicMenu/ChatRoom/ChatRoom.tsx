import React, { useState } from 'react';
import './ChatRoom.style.css';

export default function ChatRoom() {
  const [newMessage, setNewMessage] = useState('');
  return (
    <div className="toolsContainer">
      <div className="messagesContainer">
        <p>Ceci contient les messages de tchat</p>
        <p>Ceci contient les messages de tchat</p>
        <p>Ceci contient les messages de tchat</p>
        <p>Ceci contient les messages de tchat</p>
        <p>Ceci contient les messages de tchat</p>
        <p>Ceci contient les messages de tchat</p>
      </div>
      <div className="inputBlock">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write message ..."
          className="inputMessage"
        />
        <button type="button" onClick={() => console.log(newMessage)} className="sendMessage">
          Envoyer
        </button>
      </div>
    </div>
  );
}
