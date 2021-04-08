import React from 'react';
import './Participants.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// ! composant en dur avec la liste de participants à l'appel dans l'onglet de droite. A REVOIR

export default function Participants() {
  const enDur = [
    { lastname: 'Rietsch', firstname: 'Virgile', role: 'Student' },
    { lastname: 'Olivier', firstname: 'Lauren', role: 'Student' },
    { lastname: 'Bastard', firstname: 'Mayana', role: 'Student' },
    { lastname: 'Culdaut', firstname: 'Thomas', role: 'Teacher' },
    { lastname: 'Vivier', firstname: 'Stéphane', role: 'Student' },
  ];
  return (
    <div className="">
      <ol className="waitingQueueList">
        {enDur.map((participant) => (
          <li className="ParticipantsItem" key={participant.firstname}>
            <div className={participant.role === 'Student' ? 'ParticipantContainer Student' : 'ParticipantContainer Teacher'}>
              <div className="ParticipantIcon">
                <FontAwesomeIcon size="3x" icon={faUser} />
              </div>
              <div className="ParticipantText">
                <h3>
                  {participant.firstname}
                  {' '}
                  {participant.lastname}
                  {' '}
                </h3>
                <p>{participant.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
