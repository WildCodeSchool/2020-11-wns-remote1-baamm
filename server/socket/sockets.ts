import http from 'http';
import { Socket, Server } from 'socket.io';
import { AskTalkings } from '../data/askTalking';

const socketVideo = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "https://staging.baam.wns.wilders.dev/",
      methods: [ "GET", "POST" ]
    }
  });
  const socketToRoom: Record<string, string> = {};
  const users: Record<string, string[]> = {};
  const usersInTheRoom: Record<string, string[]> = {};

  io.on('connect', (socket: Socket) => {
    //   socket.on("join room", (roomID: string) => {
    //     console.log('join the room')
    //     if (users[roomID]) {
    //         const length = users[roomID].length;
    //         if (length === 4) {
    //             socket.emit("room full");
    //             return;
    //         }
    //         users[roomID].push(socket.id);
    //     } else {
    //         users[roomID] = [socket.id];
    //     }
    //     socketToRoom[socket.id] = roomID;
    //     const usersInThisRoom = users[roomID].filter((id: any) => id !== socket.id);

    //     socket.emit("all users", usersInThisRoom);
    //   });

    //   socket.on("sending signal", payload => {
    //     console.log('send signal')
    //     io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    //   });

    //   socket.on("returning signal", payload => {
    //     console.log('return signal')
    //     io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    //   });

    //   socket.on("disconnect", () => {
    //     const roomID = socketToRoom[socket.id];
    //     let room = users[roomID];
    //     if (room) {
    //       room = room.filter(id => id !== socket.id);
    //       users[roomID] = room
    //     }
    //   })
    // })

    socket.on('join room', (roomID: string) => {
      console.log('JOIN ROOM');
      if (usersInTheRoom[roomID]) {
        usersInTheRoom[roomID].push(socket.id);
      } else {
        usersInTheRoom[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersTotalInRoom = usersInTheRoom[roomID];

      console.log('usersTotalInRoom', usersTotalInRoom);

      socket.emit('all users', usersTotalInRoom);
    });

    socket.on('sending signal', (payload) => {
      console.log('sending signal');

      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on('returning signal', (payload) => {
      console.log('returning signal');

      io.to(payload.callerID).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on('disconnect', async () => {
      delete users[socket.id];
      const roomID = socketToRoom[socket.id];
      let room = usersInTheRoom[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        usersInTheRoom[roomID] = room;
        console.log('socket id', socket.id);
        socket.broadcast.emit('removeUserVideo', socket.id);
      }
    });
  });
};

export { socketVideo };

  // const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";
  // let interval: NodeJS.Timeout;
  // let askingTalkArray = AskTalkings;

  // io.on("connection", (socket) => {

  //   console.log("New client connected");
  //   io.emit("FromAPI", askingTalkArray);

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
  //     console.log("Client disconnected");
  //   });