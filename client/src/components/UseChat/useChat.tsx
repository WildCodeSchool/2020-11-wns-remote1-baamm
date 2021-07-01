import {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { Message } from '../../types';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL!;

const useChat = (roomId: string): any => {
  const [messages, setMessages] = useState<Message[]>([]); // Sent and received messages
  const socketRef: MutableRefObject<typeof Socket | undefined> = useRef();

  // add a message to the existing array of messages
  const addMessage = (message: Message) => {
    const socketRefCurrentId = socketRef.current !== undefined ? socketRef.current.id : null;
    const incomingMessage = {
      ...message,
      ownedByCurrentUser: message.senderId === socketRefCurrentId,
    };
    setMessages((oldMessages) => [...oldMessages, incomingMessage]);
  };

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
      transports: ['websocket'],
    });
    // eslint-disable-next-line no-console
    console.log('Connect');

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, addMessage);
    // Destroys the socket reference when the connection is closed
    return () => {
      if (socketRef.current !== undefined) {
        socketRef.current.disconnect();
        // eslint-disable-next-line no-console
        console.log('Disconnect');
      }
    };
  }, [roomId]);

  // Sends a message to the server that
  // dispatches it to all users in the same room
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
