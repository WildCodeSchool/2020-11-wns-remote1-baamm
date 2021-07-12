import React from 'react';
// import VideoRoom from '../Room/Room';
import ChatRoom from '../Room/ChatRoom';

import './Teacher.style.css';

function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)
  const videoStatus = true;
  const microStatus = true;

  return (
    <div className="leftColumn">
      {/* <VideoRoom /> */}
      <ChatRoom videoStatus={videoStatus} microStatus={microStatus} />
    </div>
  );
}

export default Teacher;
