import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";


const ClientComponent = () => {
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
    <div>
        <header className="App-header">
        <p>
          It's <time dateTime={response}>{response}</time>
        </p>
      </header>
    </div>
    );
}
 
export default ClientComponent;