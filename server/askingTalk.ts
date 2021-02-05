import CustomSocket from './CustomSocket';
import express from "express";
import http from 'http';
import { AskTalkings } from './data/askTalking';

const PORT: number = 5000;
const app = express();
const httpServer = require('http').Server(app);
const socketio = require('socket.io')(httpServer);
const io = require('socket.io');
const server = http.createServer(app);

let askingTalkArray = AskTalkings;
let clients: CustomSocket[] = [];

socketio.on("connection", (socket: CustomSocket) => { 
  console.log("blabla");
  io.emit("FromAPI", askingTalkArray);

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
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});