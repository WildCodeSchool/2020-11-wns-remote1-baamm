/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import './WaitingQueue.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointDown, faHandPointUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { AskingTalk } from '../../../types';
import AuthService from '../../../services/auth.service';
import socket from '../../../socket/Socket';

export default function WaitingQueue() {
  const [response, setResponse] = useState<AskingTalk[]>([]);
  const [askingTalk, setAskingTalk] = useState(false);
  const [user, setUser] = useState(AuthService.getCurrentUser);

  function askSomething() {
    setAskingTalk(true);
  }

  function cancelAskTalking() {
    // const sureToCancel = window.confirm(
    //   `Etes-vous sûr(e) de vouloir annuler votre demande d'intervention ?
    //    Vous perdrez votre place dans la file d'attente...`
    // );
    // if (sureToCancel) {
    //   if (askingTalk !== null) {
    //     setAskingTalkId(askingTalk.id);
    //   }
    //   setAskingTalk(null);
    // }
    setAskingTalk(false);
  }

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    socket.on('allInterventions', (askingTalkArray: AskingTalk[]) => {
      setResponse(askingTalkArray);
    });
  }, []);

  // useEffect(() => {
  //   socket.on('FromAPI', (data: AskingTalk[]) => {
  //     if (data) {
  //       const waitingQueueFromServer: AskingTalk[] = [];
  //       data.map((el) => waitingQueueFromServer.push(el));
  //       setResponse(waitingQueueFromServer);
  //     }
  //   });
  //   // A chaque fois qu'on reçoit un asktalking depuis le serveur
  //   socket.on('askingtalk from server', (askingTalkArray: AskingTalk[]) => {
  //     setResponse(askingTalkArray);
  //   });
  //   // A chaque fois qu'on supprime un asktalking depuis le serveur
  //   socket.on('askingtalk deleted', (askingTalkArray: AskingTalk[]) => {
  //     setResponse(askingTalkArray);
  //   });
  // }, []);

  useEffect(() => {
    if (askingTalk) {
      socket.emit('askingtalk from client', {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        askingType: 'Demand',
        askingDate: new Date(),
      });
    } else {
      socket.emit('cancel askingtalk', user.id);
    }
  }, [askingTalk, user.firstname, user.lastname, user.id]);

  // * fonction appelée par le clic sur le bouton quand on n'a pas encore demandé la parole
  // const sendAskTalking = () => {
  //   const isQuestion = window.confirm(
  // 'Cliquez sur "ok" pour une question, "annuler" pour une information'
  // );
  //   const choosenInterventionType = isQuestion ? 'question' : 'information';

  //   // * on "crée" notre demande de parole (plus tard : gérer le type d'intervention)
  // };

  // * fonction appelée par le clic sur le bouton quand on a déjà demandé la parole

  return (
    <div className="WaitingQueue">
      {user.role === 'STUDENT' && askingTalk === false ? (
        <div className="topContainerQueueOn">
          <button
            type="button"
            onClick={askSomething}
            className="askTalking"
          >
            <FontAwesomeIcon className="FingerIcon" icon={faHandPointUp} />
            Lever la main
          </button>
        </div>
      ) : (
        user.role === 'STUDENT' && (
          <div className="topContainerQueueOff">
            <button
              type="button"
              onClick={cancelAskTalking}
              className="cancelTalking"
            >
              <FontAwesomeIcon className="FingerIcon" icon={faHandPointDown} />
              Baisser la main
            </button>
          </div>
        )
      )}

      {response.length > 0 ? (
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
        <p> Il n`&apos;`y a aucune demandes pour le moment !</p>
      )}
    </div>
  );
}
