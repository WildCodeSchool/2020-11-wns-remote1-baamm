import http from 'http';
import { Socket, Server } from 'socket.io';
import videoSockets from './videoSockets';
import chatSockets from './chatSockets';

import { AskTalkings } from '../data/askTalking';

const globalSockets = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const socketToRoom: Record<string, string> = {};
  const users: Record<string, string[]> = {};
  const usersInTheRoom: Record<string, string[]> = {};
  const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";

  io.on('connect', (socket: Socket) => {
    socket.on('join room', (roomID: string) => {
      console.log('JOIN ROOM');
      if (usersInTheRoom[roomID]) {
        usersInTheRoom[roomID].push(socket.id);
      } else {
        usersInTheRoom[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersTotalInRoom = usersInTheRoom[roomID];

      console.log('usersTotalInRoom', usersTotalInRoom);

      socket.emit('all users', usersTotalInRoom);
    });

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data:any) => {
      console.log(data);
      io.emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    videoSockets(socket, io);
    // chatSockets(socket, io);

    socket.on('disconnect', async () => {
      delete users[socket.id];
      const roomID = socketToRoom[socket.id];
      let room = usersInTheRoom[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        usersInTheRoom[roomID] = room;
        console.log('socket id', socket.id);
        socket.broadcast.emit('removeUserVideo', socket.id);
      }
    });
  });
};

export { globalSockets };
