import React, { useState, useEffect } from 'react';
import useChat from './useChat';
import './ChatRoom.style.css';


export default function ChatRoom(props) {
  const { roomId } = "Test-Room"
  const { messages, sendMessage } = useChat(roomId)
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("")
  }

  return (
    <div className="toolsContainer">
      <div className="messagesContainer">
        <ol className="messagesList">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? "my-message" : "receive-message"
                }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <div className="inputBlock">
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message ..."
          className="inputMessage"
        />
        <button
          onClick={handleSendMessage}
          className="sendMessage"
        >
          Send
        </button>
      </div>

    </div>
  )
}
