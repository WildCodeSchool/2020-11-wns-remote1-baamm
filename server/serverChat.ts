import express,{ Request, Response, NextFunction } from 'express';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

const PORT: number = 5000;
const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";

const app = express();
app.use(cors());

// const io = socketIo(server);
const socketio = require('socket.io');
const server = http.createServer(app);

socketio.on("connection", (socket: any) => {
// io.on("connection", (socket: any) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data:any) => {
    // io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
     socket.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});