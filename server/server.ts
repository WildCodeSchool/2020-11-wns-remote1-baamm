import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import db from "./models";

require('dotenv').config()

import { AskTalkings } from './data/askTalking';
import CustomSocket from './CustomSocket'

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Role = db.role;

db.mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BAAMM Project." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT: any = process.env.PORT || 5000;
const httpServer = require('http').Server(app);
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

function initial() {
  Role.estimatedDocumentCount((err: any, count: any) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Express configuration
app.set("port", process.env.PORT || 5000);

const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";


const io = require('socket.io')(httpServer);

let interval: NodeJS.Timeout;
let askingTalkArray = AskTalkings;
let clients: CustomSocket[] = [];

io.on("connection", (socket: CustomSocket) => {

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
  socket.on('askingtalk from client', (askingtalk: any) => {
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


