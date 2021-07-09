import {
  useEffect, useState,
} from 'react';
import socket from '../../socket/Socket';
import { User } from '../../types';

const NEW_WAITING_STUDENT_EVENT = 'newWaitingStudent'; // Name of the event

const useQueue = (roomId: string) => {
  const [waitingStudents, setWaitingStudents] = useState<User[]>([]);

  useEffect(() => {
    // Listens for incoming waiting student
    socket.on(NEW_WAITING_STUDENT_EVENT, (student: User) => {
      const waitingStudent = {
        ...student,
      };
      setWaitingStudents((students: User[]) => [...students, waitingStudent]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      if (socket !== undefined) {
        socket.disconnect();
      }
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendWaitingList = (newStudent: User) => {
    if (socket !== undefined) {
      socket.emit(NEW_WAITING_STUDENT_EVENT, {
        body: newStudent,
      });
    }
    console.log('New student emit', newStudent);
  };

  return { waitingStudents, sendWaitingList };
};

export default useQueue;
