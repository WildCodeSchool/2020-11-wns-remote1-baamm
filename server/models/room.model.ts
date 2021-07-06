import mongoose, { Schema, Document } from "mongoose";

interface IRoom {
  name: string;
  type: string;
  session: string;
}

interface RoomDoc extends IRoom, Document {}

const RoomSchema = new Schema({
  name: String,
  type: String,
  session: String,
});

const Room = mongoose.model<RoomDoc>("Room", RoomSchema);

export default Room;