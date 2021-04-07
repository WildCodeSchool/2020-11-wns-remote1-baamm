/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './WaitingQueue.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointDown, faHandPointUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { AskingTalk } from '../../types';

const ENDPOINT = 'http://localhost:5000';

const socket = io(ENDPOINT, {
  transports: ['websocket'],
});

const userRole = Math.floor(Math.random() * 2) === 0 ? 'student' : 'teacher';

export default function WaitingQueue() {
  const [response, setResponse] = useState<AskingTalk[]>([]);
  // correspond à l'objet askingTalk qui sera la demande de prise de parole
  // (avec l'utilisateur, le type d'intervention et la date de demande)
  const [askingTalk, setAskingTalk] = useState<AskingTalk | null>(null);
  // pour stocker l'id d'un askingTalk à supprimer
  const [askingTalkId, setAskingTalkId] = useState<number | null>(null);
  // correspond à l'utilisateur connecté -- écrit en dur pour le moment
  const thisUser = {
    id: Math.floor(Math.random() * 101),
    alias: 'Youpi',
    lastName: 'Célafête',
    firstName: 'Youpi',
    role: 'student',
    askTalking: askingTalk,
  };

  useEffect(() => {
    socket.on('FromAPI', (askingTalkArray: AskingTalk[]) => {
      if (askingTalkArray) {
        const liste: AskingTalk[] = [];
        askingTalkArray.forEach((asktalking) => {
          liste.push(asktalking);
        });
        setResponse(liste);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('FromAPI', (data: AskingTalk[]) => {
      if (data) {
        const waitingQueueFromServer: AskingTalk[] = [];
        data.map((el) => waitingQueueFromServer.push(el));
        setResponse(waitingQueueFromServer);
      }
    });
    // A chaque fois qu'on reçoit un asktalking depuis le serveur
    socket.on('askingtalk from server', (askingTalkArray: AskingTalk[]) => {
      // console.log("Réception d'un nouvel askingTalkArray depuis le serveur ::: ",
      // askingTalkArray);
      setResponse(askingTalkArray);
    });
    // A chaque fois qu'on supprime un asktalking depuis le serveur
    socket.on('askingtalk deleted', (askingTalkArray: AskingTalk[]) => {
      // console.log(" Suppression d'un askingTalk depuis le serveur -
      // new asking talk array ::: ", askingTalkArray);
      setResponse(askingTalkArray);
    });
  }, []);

  // déclenché par les changements sur AskingTalk, donc dans les fonctions sendAskTalking
  // et cancelAskTalking appelées par le bouton
  useEffect(() => {
    if (askingTalk) {
      // console.log("ASKING TALK HERE ::: ", askingTalk);
      socket.emit('askingtalk from client', askingTalk);
    } else if (askingTalkId) {
      // console.log("ASKTALKING TO CANCEL ::: ", askingTalkId);
      socket.emit('cancel askingtalk', askingTalkId);
    }
  }, [askingTalk]);

  // * fonction appelée par le clic sur le bouton quand on n'a pas encore demandé la parole
  const sendAskTalking = () => {
    const isQuestion = window.confirm('Cliquez sur "ok" pour une question, "annuler" pour une information');
    const choosenInterventionType = isQuestion ? 'question' : 'information';

    // * on "crée" notre demande de parole (plus tard : gérer le type d'intervention)
    setAskingTalk({
      id: Math.floor(Math.random() * 101),
      user: thisUser,
      interventionType: choosenInterventionType,
      askingDate: new Date(),
    });
  };

  // * fonction appelée par le clic sur le bouton quand on a déjà demandé la parole
  const cancelAskTalking = () => {
    const sureToCancel = window.confirm(`Etes-vous sûr(e) de vouloir annuler votre demande d'intervention ?
      Vous perdrez votre place dans la file d'attente...`);
    if (sureToCancel) {
      if (askingTalk !== null) {
        setAskingTalkId(askingTalk.id);
      }
      setAskingTalk(null);
    }
  };

  return (
    <div className="WaitingQueue">
      {/* <h2>{userRole}</h2> */}
      {askingTalk !== null || userRole === 'teacher' ? (
        <ol className="waitingQueueList">
          {response.map((askTalking: AskingTalk) => (
            <li className="WaitingLi">
              <div className="waitingContainer" key={askTalking.id}>
                <FontAwesomeIcon icon={faUser} className="waitIcon" />
                <div>
                  <p>{askTalking.user.alias}</p>
                  <p>{askTalking.interventionType}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p>
          Il y a actuellement
          {' '}
          {response.length}
          {' '}
          personnes dans la file d&apos;attente
        </p>
      )}
      {userRole === 'student' && askingTalk === null ? (
        <div className="topContainerQueueOn">
          <button
            type="button"
            onClick={() => {
              sendAskTalking();
            }}
            className="askTalking"
            title="Demander une intervention"
          >
            <FontAwesomeIcon className="FingerIcon" icon={faHandPointUp} />
            Lever la main
          </button>
        </div>
      ) : (
        userRole === 'student' && (
          <div className="topContainerQueueOff">
            <button
              type="button"
              onClick={() => {
                cancelAskTalking();
              }}
              className="cancelTalking"
              title={
                // eslint-disable-next-line no-nested-ternary
                askingTalk
                  ? askingTalk.interventionType === 'question'
                    ? 'Annuler la question'
                    : "Annuler l'information"
                  : ''
              }
            >
              <FontAwesomeIcon className="FingerIcon" icon={faHandPointDown} />
              Baisser la main
            </button>
          </div>
        )
      )}
    </div>
  );
}
