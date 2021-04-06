import React from 'react';

import './App.css';
import Teacher from './components/Teacher/Teacher';
import DynamicMenu from './components/DynamicMenu/DynamicMenu';

function App() {
  return (
    <div className="App">
      <Teacher />
      <DynamicMenu />
    </div>
  );
}

export default App;
