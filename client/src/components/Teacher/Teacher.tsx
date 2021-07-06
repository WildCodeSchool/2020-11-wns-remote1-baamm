import React from 'react';
import VideoRoom from '../Room/Room';
import './Teacher.style.css';

function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)

  return (
    <div className="mainContainer">
      <div className="leftColumn">
        <VideoRoom />
      </div>
    </div>
  );
}

export default Teacher;
