import {
  useEffect, useState,
} from 'react';
import socket from '../../socket/Socket';
import { Message } from '../../types';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event

const useChat = (): any => {
  const [messages, setMessages] = useState<Message[]>([]); // Sent and received messages

  // add a message to the existing array of messages
  const addMessage = (message: Message) => {
    const socketRefCurrentId = socket !== undefined ? socket.id : null;
    const incomingMessage = {
      ...message,
      ownedByCurrentUser: message.senderId === socketRefCurrentId,
      userFirstname: message.userFirstname,
      userLastname: message.userLastname,
    };
    setMessages((oldMessages) => [...oldMessages, incomingMessage]);
  };

  useEffect(() => {
    // Listens for incoming messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, addMessage);
    // Destroys the socket reference when the connection is closed
    return () => {
      if (socket !== undefined) {
        socket.disconnect();
        // eslint-disable-next-line no-console
        console.log('Disconnect');
      }
    };
  }, []);

  // Sends a message to the server that
  // dispatches it to all users in the same room
  const sendMessage = (messageBody: string, user: any) => {
    if (socket !== undefined) {
      socket.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: socket.id,
        userFirstname: user.firstname,
        userLastname: user.lastname,
      });
    }
  };

  return { messages, sendMessage };
};

export default useChat;
