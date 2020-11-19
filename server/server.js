const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const index = require("./routes/index");
const data = require('./data/users');

const PORT = 5000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

// const client = require("../client/src/App")

const app = express();
app.use(index);
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("FromAPI")
  *// if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  getApiAndEmit(socket);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

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

const getApiAndEmit = socket => {
  const response = data();
  console.log("DATA ::: ", response);
  
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
