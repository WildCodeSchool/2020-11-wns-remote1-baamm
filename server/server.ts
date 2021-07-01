import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import { AskTalkings } from './data/askTalking';
import CustomSocket from './CustomSocket'

import connectDB from './config/databaseExample';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
// import profile from "./routes/api/profile";

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use(signupRouter);
app.use(signinRouter);
// app.use("/api/profile", profile);



const PORT: number = 5001;
const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";

const httpServer = require('http').Server(app);
// const io = require('socket.io')(httpServer);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: [ "GET", "POST" ]
  }
})

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
  // askingtalk => raiseHand
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

  socket.emit("me", socket.id)

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  })

  socket.on("callUser", (data: any) => {
    io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
  })

  socket.on("answerCall", (data: any) => {
    io.to(data.to).emit("callAccepted", data.signal)
  })  

  socket.on("shareScreen", (data: any) => {
    io.to(data.to).emit("shareScreen", data.signal)
  })  
  
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
