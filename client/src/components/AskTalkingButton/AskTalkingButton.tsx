import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { AskingTalk, User } from '../../types';

const ENDPOINT = 'http://localhost:5000';

const socket = io(ENDPOINT, {
  transports: ['websocket'],
});

export default function AskTalkingButton() {
  // ? correspond à l'objet askingTalk qui sera la demande de prise de parole
  // ?(avec l'utilisateur, le type d'intervention et la date de demande)
  const [askingTalk, setAskingTalk] = React.useState<AskingTalk | null>(null);
  // pour stocker l'id d'un askingTalk à supprimer
  const [askingTalkId, setAskingTalkId] = React.useState<number | null>(null);
  // correspond à l'utilisateur connecté -- écrit en dur pour le moment
  const thisUser: User = {
    id: Math.floor(Math.random() * 100) + 1,
    alias: 'Youpi',
    lastName: 'Célafête',
    firstName: 'Youpi',
    role: 'student',
    askTalking: askingTalk,
  };

  useEffect(() => {
    if (askingTalk) {
      //  console.log('ASKING TALK HERE ::: ', askingTalk);
      socket.emit('askingtalk from client', askingTalk);
    } else if (askingTalkId) {
      //  console.log('ASKTALKING TO CANCEL ::: ', askingTalkId);
      socket.emit('cancel askingtalk', askingTalkId);
    }
  }, [askingTalk]);

  //  * fonction appelée par le clic sur le bouton quand on n'a pas encore demandé la parole
  const sendAskTalking = () => {
    // TODO supprimer le window.confirm et mettre une modale personnalisée
    const isQuestion = window.confirm('Cliquez sur "ok" pour une question, "annuler" pour une information');
    const choosenInterventionType = isQuestion ? 'question' : 'information';

    // * on "crée" notre demande de parole
    setAskingTalk({
      id: Math.floor(Math.random() * 100) + 1,
      user: thisUser,
      interventionType: choosenInterventionType,
      askingDate: new Date(),
    });
  };

  // * fonction appelée par le clic sur le bouton quand on a déjà demandé la parole
  const cancelAskTalking = () => {
    // TODO créer une modale personnalisée pour le style
    const sureToCancel = window.confirm(`Etes-vous sûr(e) de vouloir annuler votre demande d'intervention ?
        Vous perdrez votre place dans la file d'attente...`);
    if (sureToCancel) {
      if (askingTalk !== null) {
        setAskingTalkId(askingTalk.id);
        setAskingTalk(null);
      }
    }
  };

  return (
    <div>
      {askingTalk && (
        <button
          type="button"
          onClick={() => {
            cancelAskTalking();
          }}
          className="cancelAskTalking"
        >
          Don&apos;t need to blabla anymore
        </button>
      )}

      {askingTalk === null && (
        <button
          type="button"
          onClick={() => {
            sendAskTalking();
          }}
          className="askTalking"
        >
          I want to blabla
        </button>
      )}
    </div>
  );
}
