import React, { useState } from 'react';
import useChat from './useChat';
import './ChatRoom.style.css';
import { Message } from '../types'

export default function ChatRoom() {
  const roomId = "Test-Room";
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewMessage(e.currentTarget.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("")
  }

  return (
    <div className="toolsContainer">
      <div className="messagesContainer">
        <ol className="messagesList">
          {messages.map((message: Message, i: number) => (
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
          onChange={(e) => handleNewMessageChange}
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
