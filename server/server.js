const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const port = process.env.PORT || 5000;
const index = require("./routes/index");

const app = express();

app.use(index);

const server = http.createServer(app);





const io = socketIo(server); 

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

app.listen(port,() => console.log(`Server started on port ${port} : http://localhost:5000`));
