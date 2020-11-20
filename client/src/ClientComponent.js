import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";


const ClientComponent = () => {
    const [response, setResponse] = useState([]);

    

  function dateDiff(dateAskingTalk){
    let date2 = new Date();
      let diff =  []               
      //let date1 = interval;
      // Initialisation du retour
      let dateTime = date2 - dateAskingTalk ;
      dateTime = Math.floor(dateTime/1000);             // Nombre de secondes entre les 2 dates
      diff.sec = dateTime % 60;                    // Extraction du nombre de secondes
   
      dateTime = Math.floor((dateTime-diff.sec)/60);    // Nombre de minutes (partie entière)
      diff.min = dateTime % 60;                    // Extraction du nombre de minutes
   
      dateTime = Math.floor((dateTime-diff.min)/60);    // Nombre d'heures (entières)
      diff.hour = dateTime % 24;                   // Extraction du nombre d'heures
      
      //let diffToString = diff.forEach((el) => {
        
      //})

      return diff;
  }


  // let interval = setInterval(() => {
  //   dateDiff();
  // }, 1000);

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
          
          // <li key={user.id}>{user.user} <br />{user.interventionType} <br />{user.askingDate} {dateDiff(Date.now, user.askingDate)} <br />  </li>
          <li key={user.id}>{user.user}<br />{user.interventionType}<br /> 
            DATE : {setInterval(() => {
                dateDiff(new Date(user.askingDate))
                }, 1000) 
            }
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
