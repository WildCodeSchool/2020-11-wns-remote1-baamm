import mongoose, { Schema, Document } from "mongoose";

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

interface UserDoc extends IUser, Document {}

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model<UserDoc>("User", UserSchema);

export default User;