import React, { useState, useEffect } from 'react';
import useQueue from './useQueue';
import './WaitingRoom.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function WaitingRoom(props) {
  const { roomId } = "QueueRoom"
  const { waitingStudents, sendWaitingList } = useQueue(roomId)
  const [newStudent, setNewStudent] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joinQueue, setJoinQueue] = useState(false)

  const leaveWaitingList = () => {
    setJoinQueue(false);
  }

  async function addToWaitingList () {
    const data = setNewStudent({
      id: Math.random(),
      lastName: lastName,
      firstName: firstName,
      role: "Etudiant"
    })
    sendWaitingList(data);
    setJoinQueue(true);
  }

  const handleNewFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleNewLastName = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="toolsContainer">
      <div>

        {joinQueue ?
          <button
            onClick={leaveWaitingList}
          >
            Leave the Queue
          </button>
          :
          <div>
            <textarea
              value={lastName}
              onChange={handleNewLastName}
              placeholder="Nom"
              className="inputMessage"
            />
            <textarea
              value={firstName}
              onChange={handleNewFirstName}
              placeholder="Prénom"
              className="inputMessage"
            />
            <button
              onClick={addToWaitingList}
            >
              Join the Queue
            </button>
          </div>
        }
      </div>
      <div className="waitingQueueContainer">
        <ol className="waitingQueueList">
          {waitingStudents.map((student, i) => (
            <li
              key={i}
            >
              <div className="waitingContainer">
                <FontAwesomeIcon icon={faUser} className="waitIcon" />
                <div>
                  <p>{student.body.lastName} {student.body.firstName}</p>
                  <p>{student.body.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

