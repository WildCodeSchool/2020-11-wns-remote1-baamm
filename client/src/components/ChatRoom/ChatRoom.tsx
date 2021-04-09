import React, { useContext, useState } from 'react';
// import useChat from '../UseChat/useChat';
import './ChatRoom.style.css';
import { Message } from '../../types';
import SocketContext from '../../context/SocketContext';

export default function ChatRoom() {
  const SocketContextType = useContext(SocketContext);
  const [newMessage, setNewMessage] = useState('');

  if (undefined !== SocketContextType) {
    const handleSendMessage = () => {
      SocketContextType.sendMessage(newMessage);
      setNewMessage('');
    };

    return (
      <div className="toolsContainer">
        <div className="messagesContainer">
          <ol className="messagesList">
            {SocketContextType.messages.map((message: Message, i: number) => (
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
            Envoyer
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>ERROR !!!</p>
    </div>
  );
}
