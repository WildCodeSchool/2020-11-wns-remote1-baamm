import AskTalking from "../models/AskTalking";
import { Socket } from "socket.io";
import CustomSocket from "./CustomSocket";

abstract class AbstractSocketListener {
    protected io: Socket;
    protected socket: CustomSocket;
    protected roomId: string;
    protected queues: Record<string, typeof AskTalking[]>;

    constructor(
        io: Socket,
        socket: CustomSocket,
        roomId: string,
        queues: Record<string, typeof AskTalking[]>) {
            this.io = io;
            this.socket = socket;
            this.roomId = roomId;
            this.queues = queues;
            this.listen();
    }

    abstract listen(): void;

}

export default AbstractSocketListener;