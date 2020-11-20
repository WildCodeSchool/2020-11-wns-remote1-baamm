import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import './WaitingQueue.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faHandRock } from '@fortawesome/free-solid-svg-icons'
import ClientComponent from "../ClientComponent";
import AskTalkingButton from './AskTalkingButton';

const ENDPOINT = "http://localhost:5000";

const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket']
});

const userRole = Math.floor(Math.random() * 2) === 0 ? 'student' : 'teacher';


////////////////////////////////////////////////////////////////////
////////////// ATTENTION CODE LAID !!! /////////////////////////////
////////////////////////////////////////////////////////////////////


export default function WaitingQueue(props) {

  const [waitingQueue, setWaitingQueue] = useState([]);


  // correspond à l'objet askingTalk qui sera la demande de prise de parole (avec l'utilisateur, le type d'intervention et la date de demande)
  const [askingTalk, setAskingTalk] = useState(null);
  // pour stocker l'id d'un askingTalk à supprimer
  const [askingTalkId, setAskingTalkId] = useState(null);
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

  useEffect(() => {

    socket.on('FromAPI', data => {
      if (data) {
        const waitingQueueFromServer = [];
        data.map((el) => {
          console.log("ELEMENT :::: ", el);
          waitingQueueFromServer.push(el);
        });
        setWaitingQueue(waitingQueueFromServer);
      }
    });
    // A chaque fois qu'on reçoit un asktalking depuis le serveur
    socket.on('askingtalk from server', askingTalkArray => {
      console.log("Réception d'un nouvel askingTalkArray depuis le serveur ::: ", askingTalkArray);
      setWaitingQueue(askingTalkArray);
    });
    // A chaque fois qu'on supprime un asktalking depuis le serveur
    socket.on('askingtalk deleted', askingTalkArray => {
      console.log("Suppression d'un askingTalk depuis le serveur - new asking talk array ::: ", askingTalkArray);
      setWaitingQueue(askingTalkArray);
    });
  }, []);

  // déclenché par les changements sur AskingTalk, donc dans les fonctions sendAskTalking et cancelAskTalking appelées par le bouton
  useEffect(() => {
    if (askingTalk) {
      console.log("ASKING TALK HERE ::: ", askingTalk);
      socket.emit('askingtalk from client', askingTalk);
    } else if (askingTalkId) {
      console.log("ASKTALKING TO CANCEL ::: ", askingTalkId);
      socket.emit('cancel askingtalk', askingTalkId);
    }

  }, [askingTalk]);

  // useEffect(() => {

  // }, [waitingQueue])


  // fonction appelée par le clic sur le bouton quand on n'a pas encore demandé la parole
  const sendAskTalking = (e) => {
    // seul les élèves ont une raison de demander la parole 
    // TODO : retirer ce if et n'afficher le bouton que si l'user est un élève
    // if (thisUser.role !== 'student') {
    //   return alert("C'est aux élèves de demander la parole");
    // }

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
        <button onClick={(e) => { sendAskTalking(e) }} className="talking-button ask-talking" title="Demander une intervention"><FontAwesomeIcon icon={faHandPointer} /></button> :
        userRole === 'student' &&
        <button onClick={(e) => { cancelAskTalking(e) }} className="talking-button cancel-ask-talking" title={askingTalk.interventionType === 'question' ?
          "Annuler la question" : "Annuler l'information"}><FontAwesomeIcon icon={faHandRock} /></button>
      }
      {/* { askingTalk &&
        <button onClick={(e) => { cancelAskTalking(e) }} className="talking-button cancel-ask-talking"><FontAwesomeIcon icon={faHandRock} /></button>
      }

      { askingTalk === null &&
        <button onClick={(e) => { sendAskTalking(e) }} className="talking-button ask-talking"><FontAwesomeIcon icon={faHandPointer} /></button>
      } */}
      { askingTalk !== null || userRole === 'teacher' ?
        <ul>
          {waitingQueue.map((askTalking) => (
            <li key={askTalking.id}>{askTalking.user.alias}, {askTalking.interventionType}</li>
          ))}
        </ul>
        :
        <p>Il y a actuellement {waitingQueue.length} personnes dans la file d'attente</p>
      }

    </div>
  )


}
