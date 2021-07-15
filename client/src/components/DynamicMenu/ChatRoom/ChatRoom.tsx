import React, { useContext, useState } from 'react';
import { Message } from '../../../types';
import ChatContext from '../../../context/ChatContext';
import './ChatRoom.style.css';
import AuthService from '../../../services/auth.service';

export default function ChatRoom() {
  const [newMessage, setNewMessage] = useState('');
  const ChatContextType = useContext(ChatContext);
  const currentUser = AuthService.getCurrentUser();

  if (ChatContextType) {
    const handleSendMessage = () => {
      ChatContextType.sendMessage(newMessage, currentUser);
      setNewMessage('');
    };

    return (
      <div className="toolsContainer">
        <div className="messagesContainer">
          <ol className="listMessages">
            {ChatContextType.messages.map((message: Message) => (
              <li className={message.ownedByCurrentUser ? 'message my-message' : 'message receive-message'}>
                <p className="userName">{message.ownedByCurrentUser ? 'Moi' : `${message.userFirstname} ${message.userLastname}`}</p>
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
      <p>Pas de tchat disponible</p>
    </div>
  );
}
