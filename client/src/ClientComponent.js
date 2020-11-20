import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";


const ClientComponent = () => {
  
  
  

  return (
    <div>
      <header className="App-header">
        <ul>
          {response.map((user) => (

            // <li key={user.id}>{user.user} <br />{user.interventionType} <br />{user.askingDate} {dateDiff(Date.now, user.askingDate)} <br />  </li>
            <li key={user.id}>{user.user}<br />{user.interventionType}<br />
            
              {/* {dateDiff((user.askingDate))}  */}
              {console.log(dateDiff(new Date(user.askingDate)))}


            </li>

          ))}

        </ul>
      </header>
    </div>
  );



}

export default ClientComponent;
