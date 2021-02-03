import express from 'express';
// import http from 'http';

import cors from 'cors';
import index from './routes/index'; 
import { AskTalkings } from './data/askTalking';

import moment from 'moment';

import CustomSocket from './CustomSocket'

const PORT: number = 5000;
const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";

const app = express();
app.use(index);
app.use(cors());

const httpServer = require('http').Server(app);
// const httpServer = new http.Server(app);
const io = require('socket.io')(httpServer);
// const io = new Server(httpServer);

let interval: NodeJS.Timeout;

<<<<<<< HEAD
let askingTalkArray = AskTalkings;
let clients: CustomSocket[] = [];
=======
let askingTalkArray = createAskTalkings();
let clients: CustomSocket[] = [];



>>>>>>> dev

io.on("connection", (socket:CustomSocket) => {

  clients.push(socket);
  console.log("New client connected");
  console.log("*********THIS IS ASKTALKINGS BABY " +AskTalkings)
  io.emit("FromAPI", askingTalkArray)

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

  const roomId = socket.handshake.query.roomId;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data: String) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // PARTIE ASKINGTALK
  //déclarer type string de askingtalk à préciser
  socket.on('askingtalk from client', (askingtalk:any) => {
    console.log("askingtalk from client ::: ", askingtalk);
    askingTalkArray.push(askingtalk);
    console.log("ICI LE NOUVEL ASKING TALK DU SERVER ::: ", askingTalkArray);
    clients.forEach(client => {
      client.emit('askingtalk from server', askingTalkArray); 
    });
    //socket.emit('askingtalk from server', askingTalkArray);
  });
  socket.on('cancel askingtalk', (askingtalkid: Number) => {
    console.log("Annulation de prise de parole depuis le client - id ::: ", askingTalkArray);
    askingTalkArray = askingTalkArray.filter((askingtalk: any) => {
      return askingtalk.id !== askingtalkid;
    });
    console.log("NOUVEAU TABLEAU APRES SUPPRESSION ::: ", askingTalkArray);
    clients.forEach(client => {
      client.emit('askingtalk deleted', askingTalkArray);  
    });
    // TODO : récupérer l'askingtalk et la supprimer
  })
  // FIN PARTIE ASKINGTALK


  // ATTENTION fusion de deux comportements !!!
  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
    console.log("Client disconnected");
    clearInterval(interval);
  });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data: any) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});
// const getApiAndEmit = (socket: any) => {
//   const response = listAskTalking()//data()
//   let dateAskingTalk = response[1].askingDate;
//   let dateTime = new Date() - date1;

//   Todo revoir 
//   function dateDiff(date1: Number, date2: Number){
//     let diff:Array<number> = []                
//     let date1 = interval;
//     Initialisation du retour
//     let dateTime = Date.now() - dateAskingTalk ;
//     dateTime = Math.floor(dateTime/1000);             // Nombre de secondes entre les 2 dates
//     diff.sec = dateTime % 60;                    // Extraction du nombre de secondes
 
//     dateTime = Math.floor((dateTime-diff.sec)/60);    // Nombre de minutes (partie entière)
//     diff.min = dateTime % 60;                    // Extraction du nombre de minutes
 
//     dateTime = Math.floor((dateTime-diff.min)/60);    // Nombre d'heures (entières)
//     diff.hour = dateTime % 24;                   // Extraction du nombre d'heures
     
//     return diff;
// }    
// let diff:number = []                
// let dateTime = Date.now() - dateAskingTalk ;
//    console.log("DATA + DATETIME ::: ", response, dateDiff(dateTime, diff ));
// };


//TODO
//askingDate
//sortir dans une fonction pour le test et séparer de socket
//installer Jest et tester 
const getApiAndEmit = (socket:any) => {
  const response = AskTalkings;

  let dateAskingTalk = response[1].askingDate; //date de demande de l'utilisateur
  let now = moment();

  // now.diff(dateAskingTalk, 'seconds');

}
    // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});




