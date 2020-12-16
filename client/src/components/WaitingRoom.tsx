import React, { useState } from 'react';
import useQueue from './useQueue';
import './WaitingRoom.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from "../types";


export default function WaitingRoom() {
  const roomId = "QueueRoom"
  const { waitingStudents, sendWaitingList } = useQueue(roomId)
  const [newStudent, setNewStudent] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joinQueue, setJoinQueue] = useState(false)

  const leaveWaitingList = () => {
    setJoinQueue(false);
  }

  async function addToWaitingList () {
    setNewStudent({
      id: Math.random(),
      alias: firstName,
      lastName: lastName,
      firstName: firstName,
      role: "Etudiant",
      askTalking: null
    })
    if (newStudent !== null) {
      sendWaitingList(newStudent);
    }
    setJoinQueue(true);
  }

  const handleNewFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };

  const handleNewLastName = (e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
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
              onChange={(e) => handleNewLastName}
              placeholder="Nom"
              className="inputMessage"
            />
            <textarea
              value={firstName}
              onChange={(e) => handleNewFirstName}
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
          {waitingStudents.map((student: User, i: number) => (
            <li
              key={i}
            >
              <div className="waitingContainer">
                <FontAwesomeIcon icon={faUser} className="waitIcon" />
                <div>
                  <p>{student.lastName} {student.firstName}</p>
                  <p>{student.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

