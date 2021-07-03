import mongoose, { Schema, Document } from "mongoose";
import { IRole } from './role.model';

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: IRole[];
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