import React, { useState, useEffect } from 'react';
import './Participants.style.css';
import logoTeacher from '../../../pictures/owlTeacher.png';
import logoStudent from '../../../pictures/owlStudent.png';
import socket from '../../../socket/Socket';

// ! composant en dur avec la liste de participants à l'appel dans l'onglet de droite. A REVOIR

export default function Participants() {
  const enDurTeacher = [
    { lastname: 'Culdaut', firstname: 'Thomas', role: 'Teacher' },
  ];

  const enDurStudent = [
    { lastname: 'Rietsch', firstname: 'Virgile', role: 'Student' },
    { lastname: 'Olivier', firstname: 'Lauren', role: 'Student' },
    { lastname: 'Bastard', firstname: 'Mayana', role: 'Student' },
    { lastname: 'Vivier', firstname: 'Stéphane', role: 'Student' },
    { lastname: 'Rietsch', firstname: 'Virgile', role: 'Student' },
    { lastname: 'Olivier', firstname: 'Lauren', role: 'Student' },
    { lastname: 'Bastard', firstname: 'Mayana', role: 'Student' },
    { lastname: 'Vivier', firstname: 'Stéphane', role: 'Student' },
  ];

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    socket.on('users', (users :any) => {
      setAllUsers(users);
    });
    console.log('ALL USERS', allUsers);
  }, [allUsers]);

  return (
    <div className="listContainer">
      <div>
        <p className="roleInfo">
          Professeur(s) :
          {' '}
          {enDurTeacher.length}
          {' '}
          participants
        </p>
        <ol className="waitingQueueList">
          {enDurTeacher.map((teacher) => (
            <li className="userItem" key={teacher.firstname}>
              <div className="userContainer">
                <img src={logoTeacher} alt="Logo" className="logo" />
                <div className="userInfoContainer">
                  <p className="userFullName">
                    {teacher.firstname}
                    {' '}
                    {teacher.lastname}
                    {' '}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <p className="roleInfo">
          Elève(s) :
          {' '}
          {enDurStudent.length}
          {' '}
          participants
        </p>
        <ol className="waitingQueueList">
          {enDurStudent.map((student) => (
            <li className="userItem" key={student.firstname}>
              <div className="userContainer">
                <img src={logoStudent} alt="Logo" className="logo" />
                <div className="userInfoContainer">
                  <p className="userFullName">
                    {student.firstname}
                    {' '}
                    {student.lastname}
                    {' '}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
