import express from 'express';
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
const io = require('socket.io')(httpServer);

let interval: NodeJS.Timeout;
let askingTalkArray = AskTalkings;
let clients: CustomSocket[] = [];

io.on("connection", (socket:CustomSocket) => {

  clients.push(socket);
  console.log("New client connected");
  io.emit("FromAPI", askingTalkArray)

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  }); 

  // * Join a conversation
  const roomId = socket.handshake.query.roomId;
  socket.join(roomId);

  // * PARTIE ASKINGTALK
  // TODO typer correctement le askingtalk
  // * quand on reçoit une demande de parole envoyé du client
  // * on l'ajoute à la liste des demandes de parole existante
  // * et on renvoie cette liste avec 'askingtalk from server'
  socket.on('askingtalk from client', (askingtalk:any) => {
    askingTalkArray.push(askingtalk);
    clients.forEach(client => {
      client.emit('askingtalk from server', askingTalkArray); 
    });
  });
  // * quand on reçoit une annulation de demande de parole envoyée du cient
  // * on renvoie le tableau des demandes de prises de paroles en supprimant la demande concernée
  socket.on('cancel askingtalk', (askingtalkid: Number) => {
    askingTalkArray = askingTalkArray.filter((askingtalk: any) => {
      return askingtalk.id !== askingtalkid;
    });
    clients.forEach(client => {
      client.emit('askingtalk deleted', askingTalkArray);  
    });
    // TODO : récupérer l'askingtalk et la supprimer
  })
  // * FIN PARTIE ASKINGTALK


  // * Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
    console.log("Client disconnected");
  });

  // * Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data: any) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

});

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
