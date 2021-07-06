import http from 'http';
import { Socket, Server } from 'socket.io';


const socketIO = (httpServer: http.Server) => {
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
  
    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter(id => id !== socket.id);
        users[roomID] = room
      }
    })
  })
}

export { socketIO };
