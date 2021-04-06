import React from 'react';
import ChatContext from './context/ChatContext';
import './App.css';
import Teacher from './components/Teacher/Teacher';
import DynamicMenu from './components/DynamicMenu/DynamicMenu';
import useChat from './components/UseChat/useChat';

function App() {
  const roomId = 'Test-Room';
  const { messages, sendMessage } = useChat(roomId);
  return (
    <div className="App">
      <ChatContext.Provider value={{ messages, sendMessage }}>
        <Teacher />
        <DynamicMenu />
      </ChatContext.Provider>
    </div>
  );
}

export default App;
