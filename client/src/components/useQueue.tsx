import {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import socketIOClient from 'socket.io-client';
import { User } from '../types';

const NEW_WAITING_STUDENT_EVENT = 'newWaitingStudent'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:5000';

const useQueue = (roomId: string) => {
  const [waitingStudents, setWaitingStudents] = useState<User[]>([]);
  const socketRef: MutableRefObject<SocketIOClient.Socket | undefined> = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
      transports: ['websocket'],
    });

    // Listens for incoming waiting student
    socketRef.current.on(NEW_WAITING_STUDENT_EVENT, (student: User) => {
      const waitingStudent = {
        ...student,
      };
      setWaitingStudents((students: User[]) => [...students, waitingStudent]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      if (socketRef.current !== undefined) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendWaitingList = (newStudent: User) => {
    if (socketRef.current !== undefined) {
      socketRef.current.emit(NEW_WAITING_STUDENT_EVENT, {
        body: newStudent,
      });
    }
    console.log('New student emit', newStudent);
  };

  return { waitingStudents, sendWaitingList };
};

export default useQueue;
