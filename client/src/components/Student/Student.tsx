import React from 'react';
import VideoChat from '../VideoCall/VideoCall';

function Student() {
  // const [showToolsContain, setShowToolsContain] = useState(true)

  return (
    <div className="mainContainer">
      <div className="leftColumn">
        <VideoChat />
      </div>
    </div>
  );
}

export default Student;
