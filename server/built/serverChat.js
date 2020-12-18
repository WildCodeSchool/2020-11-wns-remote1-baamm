"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const app = express_1.default();
app.use(cors_1.default());
// const io = socketIo(server);
const socketio = require('socket.io');
const server = http_1.default.createServer(app);
socketio.on("connection", (socket) => {
    // io.on("connection", (socket: any) => {
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        // io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        socket.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=serverChat.js.map