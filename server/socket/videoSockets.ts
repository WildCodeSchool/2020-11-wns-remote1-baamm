import { Socket, Server } from 'socket.io';

const socketToRoom: Record<string, string> = {};
const users: Record<string, string[]> = {};
const usersInTheRoom: Record<string, string[]> = {};

const videoSockets = (socket: Socket, io: Server) => {
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

  //   socket.on("sending signal", payload => {
  //     console.log('send signal')
  //     io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  //   });

  //   socket.on("returning signal", payload => {
  //     console.log('return signal')
  //     io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  //   });
}

export default videoSockets;