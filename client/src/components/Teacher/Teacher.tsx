import React from 'react';
// import VideoRoom from '../Room/Room';
import VideoGroup from '../Room/VideoGroup';

import './Teacher.style.css';

function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)
  const videoStatus = true;
  const microStatus = true;

  return (
    <div className="leftColumn">
      {/* <VideoRoom /> */}
      <VideoGroup videoStatus={videoStatus} microStatus={microStatus} />
    </div>
  );
}

export default Teacher;
