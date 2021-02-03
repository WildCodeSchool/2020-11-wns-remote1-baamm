import React from 'react';
// import './WaitingQueue.style.css';
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
          <li key={participant.firstname}>
            <div className="waitingContainer">
              <FontAwesomeIcon icon={faUser} className="waitIcon" />
              <div>
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
