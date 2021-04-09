import CustomSocket from "./CustomSocket";
import { Socket } from "socket.io";
import { IoEvent } from './constants';
import ChatListener from "./ChatListener";
import WaitingQueueListener from "./WaitingQueueListener";
import AskTalking from "../models/AskTalking";

class GlobalSocket {
    private io: Socket;
    private WaitingQueueListener: WaitingQueueListener | null;
    private ChatListener: ChatListener | null;
    private queues: Record<string, typeof AskTalking[]>
   

    constructor(io: Socket) {
        this.io = io;
        this.listen();
        this.ChatListener = null;
        this.WaitingQueueListener = null;
        this.queues = {};
    }

     private listen(): void {
        this.io.on(IoEvent.CONNECT, (socket: CustomSocket) => {
            const roomId = socket.handshake.query['roomId'];
            socket.join(roomId);
            this.ChatListener = new ChatListener(this.io,socket, roomId, this.queues);
            this.WaitingQueueListener = new WaitingQueueListener(this.io, socket, roomId, this.queues);
            socket.on(IoEvent.DISCONNECT, () => {
               console.log('Client disconnected');
               socket.leave(roomId);
            });
        });
     }


}

export default GlobalSocket;
