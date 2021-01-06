"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const askTalking_1 = __importDefault(require("./data/askTalking"));
const askTalking_2 = __importDefault(require("./data/askTalking"));
// const moment = require('moment')
const moment_1 = __importDefault(require("moment"));
const PORT = 5000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
// const client = require("../client/src/App")
const app = express_1.default();
app.use(index_1.default);
app.use(cors_1.default());
const httpServer = new http_1.default.Server(app);
const io = new socket_io_1.Server(httpServer);
let interval;
let askingTalkArray = askTalking_1.default();
let clients = [];
class CustomSocket extends socket_io_1.Socket {
}
io.on("connection", (socket) => {
    clients.push(socket);
    console.log("New client connected");
    socket.emit("FromAPI");
    //interval
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    getApiAndEmit(socket);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
    // Join a conversation
    const roomId = socket.handshake.query.roomId;
    socket.join(roomId);
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
    // PARTIE ASKINGTALK
    //déclarer type string de askingtalk à préciser
    socket.on('askingtalk from client', (askingtalk) => {
        console.log("askingtalk from client ::: ", askingtalk);
        askingTalkArray.push(askingtalk);
        console.log("ICI LE NOUVEL ASKING TALK DU SERVER ::: ", askingTalkArray);
        clients.forEach(client => {
            client.emit('askingtalk from server', askingTalkArray);
        });
        //socket.emit('askingtalk from server', askingTalkArray);
    });
    socket.on('cancel askingtalk', (askingtalkid) => {
        console.log("Annulation de prise de parole depuis le client - id ::: ", askingTalkArray);
        askingTalkArray = askingTalkArray.filter((askingtalk) => {
            return askingtalk.id !== askingtalkid;
        });
        console.log("NOUVEAU TABLEAU APRES SUPPRESSION ::: ", askingTalkArray);
        clients.forEach(client => {
            client.emit('askingtalk deleted', askingTalkArray);
        });
        // TODO : récupérer l'askingtalk et la supprimer
    });
    // FIN PARTIE ASKINGTALK
    // ATTENTION fusion de deux comportements !!!
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
        console.log("Client disconnected");
        clearInterval(interval);
    });
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});
// const getApiAndEmit = (socket: any) => {
//   const response = listAskTalking()//data()
//   let dateAskingTalk = response[1].askingDate;
//   let dateTime = new Date() - date1;
//   Todo revoir 
//   function dateDiff(date1: Number, date2: Number){
//     let diff:Array<number> = []                
//     let date1 = interval;
//     Initialisation du retour
//     let dateTime = Date.now() - dateAskingTalk ;
//     dateTime = Math.floor(dateTime/1000);             // Nombre de secondes entre les 2 dates
//     diff.sec = dateTime % 60;                    // Extraction du nombre de secondes
//     dateTime = Math.floor((dateTime-diff.sec)/60);    // Nombre de minutes (partie entière)
//     diff.min = dateTime % 60;                    // Extraction du nombre de minutes
//     dateTime = Math.floor((dateTime-diff.min)/60);    // Nombre d'heures (entières)
//     diff.hour = dateTime % 24;                   // Extraction du nombre d'heures
//     return diff;
// }    
// let diff:number = []                
// let dateTime = Date.now() - dateAskingTalk ;
//    console.log("DATA + DATETIME ::: ", response, dateDiff(dateTime, diff ));
// };
//TODO
//askingDate
//sortir dans une fonction pour le test et séparer de socket
//installer Jest et tester 
const getApiAndEmit = (socket) => {
    const response = askTalking_2.default();
    let dateAskingTalk = response[1].askingDate; //date de demande de l'utilisateur
    let now = moment_1.default();
    now.diff(dateAskingTalk, 'seconds');
};
// Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// Server.listen(PORT, () => {
httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map