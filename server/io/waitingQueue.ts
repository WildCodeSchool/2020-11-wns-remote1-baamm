import { IoEvent } from "./constants";
import Asktalking from '../models/AskTalking'

class WaitingQueue {
    private socket: any;
    private roomId: string | number;
    public askingTalkArray: typeof Asktalking[];

    constructor(
        socket: any,
        roomId: string | number ) {
            this.askingTalkArray = [];
            this.socket = socket;
            this.roomId = roomId;
            this.waitingQueueListen();
    }

    public waitingQueueListen(): void {
        console.log('I WAS IN WAITINGQUEUE !!!!');

        this.socket.on(IoEvent.RAISE_HAND_CLIENT, (askingtalk:any) => {
            this.askingTalkArray.push(askingtalk);
            console.log('askingtalkarray ::: ', this.askingTalkArray);
            this.socket.in(this.roomId).emit(IoEvent.RAISE_HAND_SERVER, this.askingTalkArray)
          });
        
        this.socket.on(IoEvent.LOWER_HAND_CLIENT, (askingtalkid: Number) => {
            this.askingTalkArray = this.askingTalkArray.filter((askingtalk: any) => {
                return askingtalk.id !== askingtalkid;
            });
            this.socket.in(this.roomId).emit(IoEvent.LOWER_HAND_SERVER, this.askingTalkArray);  
            })
    }
}

export default WaitingQueue;
