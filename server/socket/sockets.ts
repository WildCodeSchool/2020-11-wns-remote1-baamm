import http from 'http';
import { Socket, Server } from 'socket.io';
import { AskTalkings } from '../data/askTalking';

const socketVideo = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
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
