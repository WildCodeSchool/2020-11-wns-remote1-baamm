import { Socket } from "socket.io";
import { IoEvent } from "./constants";
import Asktalking from '../models/AskTalking'
import CustomSocket from "./CustomSocket";
import AbstractSocketListener from "./AbstractSocketListener";
import AskTalking from "../models/AskTalking";

class WaitingQueue extends AbstractSocketListener{
    private askingTalkArray: typeof Asktalking[];

    constructor(io: Socket, socket: CustomSocket, roomId: string, queues: Record<string, typeof AskTalking[]>) {
        super(io, socket, roomId, queues)
        this.askingTalkArray = [];
    }

    public listen(): void {
        console.log('QUEUES :::: ', this.queues);


        this.socket.on(IoEvent.RAISE_HAND_CLIENT, (askingtalk:any) => {
            // this.askingTalkArray.push(askingtalk);
            if (this.queues[this.roomId]) {
                this.queues[this.roomId].push(askingtalk);
            } else {
                // ajouter l'objet avec la roomid
            }
            this.io.to(this.roomId).emit(IoEvent.RAISE_HAND_SERVER, this.askingTalkArray)
          });
        
        this.socket.on(IoEvent.LOWER_HAND_CLIENT, (askingtalkid: Number) => {
            this.askingTalkArray = this.askingTalkArray.filter((askingtalk: any) => {
                return askingtalk.id !== askingtalkid;
            });
            this.io.to(this.roomId).emit(IoEvent.LOWER_HAND_SERVER, this.askingTalkArray);  
            })
    }
}

export default WaitingQueue;
