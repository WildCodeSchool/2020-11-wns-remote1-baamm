import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_WAITING_STUDENT_EVENT = "newWaitingStudent"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:5000";

const useQueue = (roomId) => {
  const [waitingStudents, setWaitingStudents] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
      transports: ['websocket']
    });
    
    // Listens for incoming waiting student
    socketRef.current.on(NEW_WAITING_STUDENT_EVENT, (student) => {
      const waitingStudent = {
        ...student,
      };
      setWaitingStudents((students) => [...students, waitingStudent]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendWaitingList = (newStudent) => {
    socketRef.current.emit(NEW_WAITING_STUDENT_EVENT, {
      body: newStudent,
    });
    console.log("New student emit", newStudent)
  };

  return { waitingStudents, sendWaitingList };
};

export default useQueue;