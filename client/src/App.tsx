import React from 'react';
import SocketContext from './context/SocketContext';
import './App.css';
import Teacher from './components/Teacher/Teacher';
import DynamicMenu from './components/DynamicMenu/DynamicMenu';
import useChat from './components/UseChat/useChat';

function App() {
  const roomId = 'Test-Room';
  const { messages, sendMessage, socketRef } = useChat(roomId);
  return (
    <div className="App">
      <SocketContext.Provider value={{ messages, sendMessage, socketRef }}>
        <Teacher />
        <DynamicMenu />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
