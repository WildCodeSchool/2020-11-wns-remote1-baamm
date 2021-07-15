import React from 'react';
// import VideoRoom from '../Room/Room';
import ChatVideo from '../Room/ChatVideo';

import './Teacher.style.css';

function Teacher() {
  // const [showToolsContain, setShowToolsContain] = useState(true)

  return (
    <div className="leftColumn">
      <ChatVideo />
    </div>
  );
}

export default Teacher;
