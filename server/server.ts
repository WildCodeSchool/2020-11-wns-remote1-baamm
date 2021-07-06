import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { socketVideo } from './socket/serverVideo';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { roomRouter } from './routes/room.routes';

require('dotenv').config()

import { AskTalkings } from './data/askTalking';
import CustomSocket from './CustomSocket'

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Totow:jecode4wcs@baammcluster.wxcnu.mongodb.net/db_baamm?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BAAMM Project." });
});

app.use(authRouter);
app.use(userRouter);
app.use(roomRouter);

const PORT: any = process.env.PORT || 5000;
const httpServer = new http.Server(app);
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

socketVideo(httpServer);

// Express configuration
app.set("port", process.env.PORT || 5000);