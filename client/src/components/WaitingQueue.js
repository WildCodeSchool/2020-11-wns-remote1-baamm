import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

export default function WaitingQueue(props) {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      transports: ['websocket']
    });
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="toolscontainer">
      <header className="App-header">
        <p>
          {response}
        </p>
      </header>
    </div>
  );

}



  // return (
  //   <div className="toolsContainer">
  //     <p>Hi from Waiting Queue</p>
  //   </div>
  // );

// const ClientComponent = () => {

// }

// export default ClientComponent;