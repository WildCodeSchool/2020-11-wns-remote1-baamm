const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');

const index = require("./routes/index");
const data = require('./data/users');

const listAskTalking = require("./data/askTalking");

const PORT = 5000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

// const client = require("../client/src/App")

const app = express();
app.use(index);
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

let interval;

//date
// let date1 = new Date('2020-11-18 13:40:00');
// let tmp = date2 - date1

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("FromAPI")

  //interval
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  getApiAndEmit(socket);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  
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
  const response = listAskTalking()//data()
  let dateAskingTalk = response[0].askingDate;
  //let dateTime = new Date() - date1;

  function dateDiff(date1, date2){
    let diff = {}                 
    //let date1 = interval;
    // Initialisation du retour
    let dateTime = Date.now() - dateAskingTalk ;
    dateTime = Math.floor(dateTime/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = dateTime % 60;                    // Extraction du nombre de secondes
 
    dateTime = Math.floor((dateTime-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = dateTime % 60;                    // Extraction du nombre de minutes
 
    dateTime = Math.floor((dateTime-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = dateTime % 24;                   // Extraction du nombre d'heures
     
    return diff;
}
  console.log("DATA + DATETIME ::: ", response, dateDiff());

  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});




