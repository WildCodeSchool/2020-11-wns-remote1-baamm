import React, { useContext, useState } from 'react';
import { Message } from '../../../types';
import ChatContext from '../../../context/ChatContext';
import './ChatRoom.style.css';

export default function ChatRoom() {
  const [newMessage, setNewMessage] = useState('');
  const ChatContextType = useContext(ChatContext);

  if (ChatContextType) {
    const handleSendMessage = () => {
      ChatContextType.sendMessage(newMessage);
      setNewMessage('');
    };

    return (
      <div className="toolsContainer">
        <div className="messagesContainer">
          <ol className="listMessages">
            {ChatContextType.messages.map((message: Message) => (
              <li className={message.ownedByCurrentUser ? 'message my-message' : 'message receive-message'}>
                <p className="userName">{message.ownedByCurrentUser ? 'Moi' : message.ownedByCurrentUser}</p>
                <p className="messageBody">{message.body}</p>
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
          <button type="button" onClick={handleSendMessage} className="sendButton">
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