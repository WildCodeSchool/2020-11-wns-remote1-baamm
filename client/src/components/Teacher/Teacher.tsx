import React from 'react';
// import VideoRoom from '../Room/Room';
import VideoGroup from '../Room/VideoGroup';

import './Teacher.style.css';

function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)

  return (
    <div className="mainContainer">
      <div className="leftColumn">
        {/* <VideoRoom /> */}
        <VideoGroup videoStatus microStatus />
      </div>
    </div>
  );
}

export default Teacher;
