import mongoose, { Schema, Document } from "mongoose";

export interface IRole {
  name: String;
}

export interface RoleDoc extends IRole, Document {}

const RoleSchema = new Schema({
  name: String,
});

const Role = mongoose.model<RoleDoc>("Role", RoleSchema);

export default Role;