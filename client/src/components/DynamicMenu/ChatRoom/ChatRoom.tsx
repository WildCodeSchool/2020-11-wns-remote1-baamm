// import React, { useState } from 'react';
// import './ChatRoom.style.css';

// export default function ChatRoom() {
//   const [newMessage, setNewMessage] = useState('');
//   return (
//     <div className="toolsContainer">
//       <div className="messagesContainer">
//         <p>Ceci contient les messages de tchat</p>
//         <p>Ceci contient les messages de tchat</p>
//         <p>Ceci contient les messages de tchat</p>
//         <p>Ceci contient les messages de tchat</p>
//         <p>Ceci contient les messages de tchat</p>
//         <p>Ceci contient les messages de tchat</p>
//       </div>
//       <div className="inputBlock">
//         <textarea
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Write message ..."
//           className="inputMessage"
//         />
//         <button type="button" onClick={() => console.log(newMessage)} className="sendMessage">
//           Envoyer
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useState } from 'react';
import './ChatRoom.style.css';
import { Message } from '../../../types';
import ChatContext from '../../../context/ChatContext';

export default function ChatRoom() {
  const ChatContextType = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState('');

  if (ChatContextType) {
    const handleSendMessage = () => {
      ChatContextType.sendMessage(newMessage);
      setNewMessage('');
    };

    return (
      <div className="toolsContainer">
        <div className="messagesContainer">
          <ol className="messagesList">
            {ChatContextType.messages.map((message: Message, i: number) => (
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
