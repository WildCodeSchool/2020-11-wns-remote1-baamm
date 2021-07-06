import http from 'http';
import { Socket, Server } from 'socket.io';
import { AskTalkings } from '../data/askTalking';
import CustomSocket from '../CustomSocket'



const socketVideo = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: [ "GET", "POST" ]
    }
  });
  const socketToRoom: Record<string, string> = {};
  const users: Record< string, string[]> = {};

  io.on('connect', (socket: Socket) => {
    socket.on("join room", (roomID: string) => {
      console.log('join the room')
      if (users[roomID]) {
          const length = users[roomID].length;
          if (length === 4) {
              socket.emit("room full");
              return;
          }
          users[roomID].push(socket.id);
      } else {
          users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter((id: any) => id !== socket.id);
  
      socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
      console.log('send signal')
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
      console.log('return signal')
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter(id => id !== socket.id);
        users[roomID] = room
      }
    })
  })


  const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";
  let interval: NodeJS.Timeout;
  let askingTalkArray = AskTalkings;
  let clients: CustomSocket[] = [];

  io.on("connection", (socket: CustomSocket) => {

    clients.push(socket);
    console.log("New client connected");
    io.emit("FromAPI", askingTalkArray);
  
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
}

export { socketVideo };