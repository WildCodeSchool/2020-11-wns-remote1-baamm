import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { socketIO } from './serverVideo';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { roomRouter } from './routes/room.routes';

require('dotenv').config()

import { AskTalkings } from './data/askTalking';
import CustomSocket from './CustomSocket'

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Totow:jecode4wcs@baammcluster.wxcnu.mongodb.net/db_baamm?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BAAMM Project." });
});

app.use(authRouter);
app.use(userRouter);
app.use(roomRouter);

const PORT: any = process.env.PORT || 5000;
const httpServer = new http.Server(app);
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
socketIO(httpServer);

// // Express configuration
// app.set("port", process.env.PORT || 5000);

// const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";

// const io = require("socket.io")(httpServer)

// const users : any = {}

// const socketToRoom : any = {}

// let interval: NodeJS.Timeout;
// let askingTalkArray = AskTalkings;
// let clients: CustomSocket[] = [];

// io.on("connection", (socket: CustomSocket) => {

//   clients.push(socket);
//   console.log("New client connected");
//   io.emit("FromAPI", askingTalkArray)

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });

//   // * Join a conversation
//   const roomId = socket.handshake.query.roomId;
//   socket.join(roomId);

//   // * PARTIE ASKINGTALK
//   // TODO typer correctement le askingtalk
//   // * quand on reçoit une demande de parole envoyé du client
//   // * on l'ajoute à la liste des demandes de parole existante
//   // * et on renvoie cette liste avec 'askingtalk from server'
//   // askingtalk => raiseHand
//   socket.on('askingtalk from client', (askingtalk: any) => {
//     askingTalkArray.push(askingtalk);
//     clients.forEach(client => {
//       client.emit('askingtalk from server', askingTalkArray);
//     });
//   });
//   // * quand on reçoit une annulation de demande de parole envoyée du cient
//   // * on renvoie le tableau des demandes de prises de paroles en supprimant la demande concernée
//   socket.on('cancel askingtalk', (askingtalkid: Number) => {
//     askingTalkArray = askingTalkArray.filter((askingtalk: any) => {
//       return askingtalk.id !== askingtalkid;
//     });
//     clients.forEach(client => {
//       client.emit('askingtalk deleted', askingTalkArray);
//     });
//     // TODO : récupérer l'askingtalk et la supprimer
//   })
//   // * FIN PARTIE ASKINGTALK


//   // * Leave the room if the user closes the socket
//   socket.on("disconnect", () => {
//     socket.leave(roomId);
//     console.log("Client disconnected");
//   });

//   // * Listen for new messages
//   socket.on(NEW_CHAT_MESSAGE_EVENT, (data: any) => {
//     io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
//   });

//   socket.emit("me", socket.id)

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callEnded")
//   })

//   socket.on("callUser", (data: any) => {
//     io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
//   })

//   socket.on("answerCall", (data: any) => {
//     io.to(data.to).emit("callAccepted", data.signal)
//   })  

//   socket.on("shareScreen", (data: any) => {
//     io.to(data.to).emit("shareScreen", data.signal)
//   })  

//   socket.on('disconnect', () => {
//       const roomID = socketToRoom[socket.id];
//       let room = users[roomID];
//       if (room) {
//           room = room.filter((id: string) => id !== socket.id);
//           users[roomID] = room;
//       }
//   });  
// });


