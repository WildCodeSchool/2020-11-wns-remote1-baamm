
import cors from "cors";
import express from "express";
import { Server } from "http";
import { Socket } from "socket.io";
import CustomSocket from '../CustomSocket';
import { IoEvent } from './constants';
import WaitingQueue from "./waitingQueue";

class GlobalSocket {
    // private _app: express.Application;
    private httpServer: Server;
    private io: Socket;
    private clients: CustomSocket[];
    private port: string | number;
    // private port: string | number;
    private WaitingQueue: WaitingQueue;

    constructor(io: Socket, httpServer: Server, port: string | number) {
        // this._app = express();
        // this._app.use(cors());
        // this.port = 5000;
        this.clients = [];
        this.port = port;
        this.httpServer = httpServer;
        // this.httpServer = require('http').Server(this._app);
        this.io = io;
        this.listen();
        this.WaitingQueue = new WaitingQueue(
            this.io, 
            // this.httpServer,
            // this.port,
            this.clients);
    }

     private listen(): void {
        this.httpServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
         });

        this.io.on(IoEvent.CONNECT, (socket: any) => {
            this.clients.push(socket);
            console.log('Connected client on port %s.', this.port);
            const roomId = socket.handshake.query['roomId'];
            socket.join(roomId);
            // const waitingQueue = new WaitingQueue(this.io, this.clients);
            // const waitingQueue = require("WaitingQueue");
            socket.on(IoEvent.DISCONNECT, () => {
               console.log('Client disconnected');
               socket.leave(roomId);
            });
        });
     }


}

export default GlobalSocket;
