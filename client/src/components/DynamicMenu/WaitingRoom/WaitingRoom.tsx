import React, { useState } from 'react';
import './WaitingRoom.style.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import useQueue from '../../hooks/useQueue';
import { User } from '../../../types';

export default function WaitingRoom() {
  // const roomId = 'QueueRoom';
  // const { waitingStudents, sendWaitingList } = useQueue(roomId);
  const [newStudent, setNewStudent] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [joinQueue, setJoinQueue] = useState(false);

  const leaveWaitingList = () => {
    setJoinQueue(false);
  };

  async function addToWaitingList() {
    setNewStudent({
      id: Math.random(),
      alias: firstName,
      lastName,
      firstName,
      role: 'Etudiant',
      askTalking: null,
    });
    if (newStudent !== null) {
      // sendWaitingList(newStudent);
    }
    setJoinQueue(true);
  }

  return (
    <div className="toolsContainer">
      <div>
        {joinQueue ? (
          <button onClick={leaveWaitingList} type="button">Leave the Queue</button>
        ) : (
          <div>
            <textarea value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} placeholder="Nom" className="inputMessage" />
            <textarea
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              placeholder="Prénom"
              className="inputMessage"
            />
            <button onClick={addToWaitingList} type="button">Join the Queue</button>
          </div>
        )}
      </div>
      <div className="waitingQueueContainer">
        <ol className="waitingQueueList">
          {/* {waitingStudents.map((student: User) => (
            <li key={student.id}>
              <div className="waitingContainer">
                <FontAwesomeIcon icon={faUser} className="waitIcon" />
                <div>
                  <p>
                    {student.lastName}
                    {' '}
                    {student.firstName}
                  </p>
                  <p>{student.role}</p>
                </div>
              </div>
            </li>
          ))} */}
        </ol>
      </div>
    </div>
  );
}
