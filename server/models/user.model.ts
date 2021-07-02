import mongoose, { Schema, Document } from "mongoose";

interface IUser {
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  // roles : tableau de String ?
}

interface UserDoc extends IUser, Document {}

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});

const User = mongoose.model<UserDoc>("User", UserSchema);

export default User;