import { Socket } from "socket.io";
import express from "express";
import { Server } from "http";
import { IoEvent } from "./constants";
import Asktalking from '../models/AskTalking'
import CustomSocket from "../CustomSocket";

class WaitingQueue {
    private io: Socket;
    // private httpServer: Server;
    // private port: string | number;
    public askingTalkArray: typeof Asktalking[];
    private clients: CustomSocket[];

    constructor(
        io: Socket,
        // httpServer: Server,
        // port: string | number,
        clients: CustomSocket[] ) {
            this.askingTalkArray = [];
            this.clients = clients;
            // this.httpServer = httpServer;
            // this.port = port;
            this.io = io;
            this.waitingQueueListen();
    }

    private waitingQueueListen(): void {
        console.log('I WAS THERE !!!');

        // this.httpServer.listen(this.port, () => {
        //     console.log('Running server on port %s', this.port);
        //  });

        this.io.on(IoEvent.RAISE_HAND_CLIENT, (askingtalk:any) => {
            this.askingTalkArray.push(askingtalk);
            console.log("ASKINGTALK ::::: ", askingtalk);
            this.clients.forEach(client => {
              client.emit(IoEvent.RAISE_HAND_SERVER, this.askingTalkArray); 
            });
          });
        
        this.io.on(IoEvent.LOWER_HAND_CLIENT, (askingtalkid: Number) => {
            this.askingTalkArray = this.askingTalkArray.filter((askingtalk: any) => {
                return askingtalk.id !== askingtalkid;
            });
            this.clients.forEach(client => {
                client.emit(IoEvent.LOWER_HAND_SERVER, this.askingTalkArray);  
            });
            })
    }
}



export default WaitingQueue;