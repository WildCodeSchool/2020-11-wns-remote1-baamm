const express = require("express");
const http = require("http")
const socketIo = require("socket.io");
const cors = require('cors');

const PORT = 5000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});