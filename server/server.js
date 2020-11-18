const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const port = process.env.PORT || 5000;
const index = require("./routes/index");
const data = require('./data/users');

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

const getApiAndEmit = socket => {
  const response = data();
  console.log("DATA ::: ", response);
  
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port,() => console.log(`Cors allowed. Server started on port ${port} : http://localhost:5000`));
