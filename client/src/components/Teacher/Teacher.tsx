import React from 'react';
import VideoChat from '../VideoCall/VideoCall';
import './Teacher.style.css';

function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)

  return (
    <div className="mainContainer">
      <div className="leftColumn">
        <VideoChat />
      </div>
    </div>
  );
}

export default Teacher;
