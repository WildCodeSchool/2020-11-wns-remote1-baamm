import AskTalking from "models/AskTalking";
import { Socket } from "socket.io";
import AbstractSocketListener from "./AbstractSocketListener";
import { IoEvent } from './constants';
import CustomSocket from "./CustomSocket";

class ChatListener extends AbstractSocketListener{

  constructor (io: Socket, socket: CustomSocket, roomId: string, queues: Record<string, typeof AskTalking[]>) {
    super(io, socket, roomId, queues)
  }

  public listen() {
    this.socket.on(IoEvent.NEW_CHAT_MESSAGE, (data:any) => {
      this.io.to(this.roomId).emit(IoEvent.NEW_CHAT_MESSAGE, data);
   });
 }
  }


export default ChatListener;
