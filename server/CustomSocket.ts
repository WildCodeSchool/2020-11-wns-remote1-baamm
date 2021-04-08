import  { Socket } from 'socket.io';
import  { Handshake }   from 'socket.io/dist/socket';

interface CustomHandshake extends Handshake{
    query: {
      roomId: string
    }
  }
  
export default class CustomSocket extends Socket {
  readonly handshake!: CustomHandshake;
}
