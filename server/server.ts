import bodyParser from "body-parser";
import express from "express";

import { AskTalkings } from './data/askTalking';
import CustomSocket from './CustomSocket'

import connectDB from "./config/databaseExample";
import authRoute from "./routes/api/auth";
import postRoute from "./routes/api/post";
import GlobalSocket from "./io/GlobalSocket";
// import profile from "./routes/api/profile";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
// app.use("/api/profile", profile);



const PORT: number = 5000;
const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";

const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const globalSocket = new GlobalSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
