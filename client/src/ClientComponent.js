import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";


const ClientComponent = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, {
          transports: ['websocket']
        });
        
        socket.on("FromAPI", data => {
          console.log('fromAPI', data)
          if (data) {
            console.log('DATA', data)
            const liste = [];
            data.forEach(user => {
                if (user.role === 'student') {
                  liste.push(user);
                }
            })
            console.log("LISTE ::: ", liste);
            setResponse(liste);
          }
          
        });
        return () => socket.disconnect();
        
      }, []);
      console.log(  )
      
    return ( 
    <div>
        <header className="App-header">
        <ul>
        {response.map((user) => (
          <li key={user.id}>{user.alias}</li>
        ))}
        
        </ul>  
      </header>
    </div>
    );
}

export default ClientComponent;

