import React from 'react';
import Teacher from '../Teacher/Teacher';
import DynamicMenu from '../DynamicMenu/DynamicMenu';

import './App.css';

function Room() {
  // const [loadClient, setLoadClient] = useState(true);

  return (
    <div className="App">
      <Teacher />
      <DynamicMenu />
    </div>
  );
}

export default Room;
