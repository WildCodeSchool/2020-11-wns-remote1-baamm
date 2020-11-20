import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import './WaitingQueue.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ENDPOINT = "http://localhost:5000";

const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket']
});

const userRole = Math.floor(Math.random() * 2) === 0 ? 'student' : 'teacher';
////////////////////////////////////////////////////////////////////
////////////// ATTENTION CODE LAID !!! /////////////////////////////
////////////////////////////////////////////////////////////////////


export default function WaitingQueue(props) {
  const [response, setResponse] = useState([]);
  // correspond à l'objet askingTalk qui sera la demande de prise de parole (avec l'utilisateur, le type d'intervention et la date de demande)
  const [askingTalk, setAskingTalk] = useState(null);
  // pour stocker l'id d'un askingTalk à supprimer
  const [askingTalkId, setAskingTalkId] = useState(null);

  const [diff, setDiff] = useState(0);
  // correspond à l'utilisateur connecté -- écrit en dur pour le moment
  const thisUser =
  {
    id: Math.floor(Math.random() * 101),
    alias: 'Youpi',
    lastName: 'Célafête',
    firstName: 'Youpi',
    role: 'student',
    askTalking: askingTalk
  }

  function dateDiff(dateAskingTalk) {
    let diff = (new Date() - dateAskingTalk) / 100;
    // let diff = []
    // //let date1 = interval;
    // // Initialisation du retour
    // let dateTime = date2 - dateAskingTalk;
    // dateTime = Math.floor(dateTime / 1000);             // Nombre de secondes entre les 2 dates
    // diff.sec = dateTime % 60;                    // Extraction du nombre de secondes

    // dateTime = Math.floor((dateTime - diff.sec) / 60);    // Nombre de minutes (partie entière)
    // diff.min = dateTime % 60;                    // Extraction du nombre de minutes

    // dateTime = Math.floor((dateTime - diff.min) / 60);    // Nombre d'heures (entières)
    // diff.hour = dateTime % 24;                   // Extraction du nombre d'heures

    // //let diffToString = diff.forEach((el) => {

    //})

    setDiff(diff);
  }

  useEffect(() => {

  }, [diff])

  useEffect(() => {
    socket.on("FromAPI", listAskTalking => {
      if (listAskTalking) {
        const liste = [];
        listAskTalking.forEach(asktalking => {
          liste.push(asktalking)
        })
        setResponse(liste);
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on('FromAPI', data => {
      if (data) {
        const waitingQueueFromServer = [];
        data.map((el) => {
          waitingQueueFromServer.push(el);
        });
        setResponse(waitingQueueFromServer);
      }
    });
    // A chaque fois qu'on reçoit un asktalking depuis le serveur
    socket.on('askingtalk from server', askingTalkArray => {
      // console.log("Réception d'un nouvel askingTalkArray depuis le serveur ::: ", askingTalkArray);
      setResponse(askingTalkArray);
    });
    // A chaque fois qu'on supprime un asktalking depuis le serveur
    socket.on('askingtalk deleted', askingTalkArray => {
      // console.log("Suppression d'un askingTalk depuis le serveur - new asking talk array ::: ", askingTalkArray);
      setResponse(askingTalkArray);
    });
  }, []);

  // déclenché par les changements sur AskingTalk, donc dans les fonctions sendAskTalking et cancelAskTalking appelées par le bouton
  useEffect(() => {
    if (askingTalk) {
      // console.log("ASKING TALK HERE ::: ", askingTalk);
      socket.emit('askingtalk from client', askingTalk);
    } else if (askingTalkId) {
      // console.log("ASKTALKING TO CANCEL ::: ", askingTalkId);
      socket.emit('cancel askingtalk', askingTalkId);
    }
  }, [askingTalk]);


  // fonction appelée par le clic sur le bouton quand on n'a pas encore demandé la parole
  const sendAskTalking = (e) => {

    let choosenInterventionType;
    let isQuestion = window.confirm(`Cliquez sur "ok" pour une question, "annuler" pour une information`);
    choosenInterventionType = isQuestion ? "question" : "information";

    // on "crée" notre demande de parole (plus tard : gérer le type d'intervention)
    setAskingTalk(
      {
        id: Math.floor(Math.random() * 101),
        user: thisUser,
        interventionType: choosenInterventionType,
        askingDate: new Date()
      }
    );
  }

  // fonction appelée par le clic sur le bouton quand on a déjà demandé la parole
  const cancelAskTalking = (e) => {
    let sureToCancel = window.confirm(`Etes-vous sûr(e) de vouloir annuler votre demande d'intervention ?
      Vous perdrez votre place dans la file d'attente...`);
    if (sureToCancel) {
      setAskingTalkId(askingTalk.id);
      setAskingTalk(null);
    }
  }

  return (
    <div className="waiting-queue">
      <h2>{userRole}</h2>
      { userRole === 'student' && askingTalk === null ?
        <div className="topContainerQueueOn">
          <button onClick={(e) => { sendAskTalking(e) }}
            className="askTalking"
            title="Demander une intervention"
          >
            Join the queue
        </button>
        </div>
        :
        userRole === 'student' &&
        <div className="topContainerQueueOff">
          <button onClick={(e) => { cancelAskTalking(e) }}
            className="askTalking"
            title={askingTalk.interventionType === 'question' ?
              "Annuler la question" : "Annuler l'information"}
          >
            Leave the queue
          </button>
        </div>
      }
      { askingTalk !== null || userRole === 'teacher' ?
        <ol className="waitingQueueList">
          {response.map((askTalking) => (
            <div className="waitingContainer" key={askTalking.id}>
              <FontAwesomeIcon icon={faUser} className="waitIcon" />
              <div>
                <p>{askTalking.user.alias}</p>
                <p>{askTalking.interventionType}</p>
              <p>depuis : {setInterval(() => {
                  dateDiff(askTalking.askingDate)
                }, 1000)
                }
              </p>
              </div>
            </div>
          ))}
        </ol>
        :
        <p>Il y a actuellement {response.length} personnes dans la file d'attente</p>
      }

    </div>
  )


}
