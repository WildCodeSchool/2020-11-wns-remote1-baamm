import {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import socketIOClient from 'socket.io-client';
import { Message } from '../../types';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:5000';

const useChat = (roomId: string): any => {
  const [messages, setMessages] = useState<Message[]>([]); // Sent and received messages
  const socketRef: MutableRefObject<SocketIOClient.Socket | undefined> = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
      transports: ['websocket'],
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
      const socketRefCurrentId = socketRef.current !== undefined ? socketRef.current.id : null;
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRefCurrentId,
      };
      setMessages(() => [...messages, incomingMessage]);
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
  const sendMessage = (messageBody: string) => {
    if (socketRef.current !== undefined) {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: socketRef.current.id,
      });
    }
  };

  return { messages, sendMessage };
};

export default useChat;
