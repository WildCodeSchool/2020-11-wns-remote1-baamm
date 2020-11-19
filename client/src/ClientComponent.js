import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";


const ClientComponent = () => {
    const [response, setResponse] = useState([]);
   

//liste des eleves
    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT, {
    //       transports: ['websocket']
    //     });  
    //     socket.on("FromAPI", data => {
    //       console.log('fromAPI', data)
    //       if (data) {
    //         console.log('DATA', data)
    //         const liste = [];
    //         data.forEach(user => {
    //             if (user.role === 'student') {
    //               liste.push(user);
    //             }
    //         })
    //         console.log("LISTE ::: ", liste);
    //         setResponse(liste);
    //       }
    //     });

        useEffect(() => {
          const socket = socketIOClient(ENDPOINT, {
            transports: ['websocket']
          });  
          socket.on("FromAPI", listAskTalking => {
            console.log('fromAPI', listAskTalking)
            if (listAskTalking) {
              console.log('DATA', listAskTalking)
              const liste = [];
              listAskTalking.forEach(asktalking => {
                  liste.push(asktalking)
              })
              console.log("LISTE ::: ", liste);
              setResponse(liste);
            }
          });

        return () => socket.disconnect();  
      }, []);

    return ( 
    <div>
        <header className="App-header">
        <ul>
        {response.map((user) => (
          <li key={user.id}>{user.user} <br />{user.interventionType} <br />{user.askingDate}<br />  </li>
        ))}
        
        </ul>  
      </header>
    </div>
    );



}

export default ClientComponent;
