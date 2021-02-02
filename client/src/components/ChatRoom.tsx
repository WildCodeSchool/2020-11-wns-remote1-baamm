import React, { useState } from 'react';
import useChat from './useChat';
import './ChatRoom.style.css';
import { Message } from '../types';

export default function ChatRoom() {
  const roomId = 'Test-Room';
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="toolsContainer">
      <div className="messagesContainer">
        <ol className="messagesList">
          {messages.map((message: Message, i: number) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? 'my-message' : 'receive-message'}`}
            >
              {message.body}
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
        <button type="button" onClick={handleSendMessage} className="sendMessage">
          Send
        </button>
      </div>
    </div>
  );
}
