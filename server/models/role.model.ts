import mongoose, { Schema, Document } from "mongoose";

interface IRole {
  name: String;
}

interface RoleDoc extends IRole, Document {}

const RoleSchema = new Schema({
  name: String,
});

const Role = mongoose.model<RoleDoc>("Role", RoleSchema);

export default Role;

// import { Schema, model } from "mongoose";

// const Role = model(
//   "Role",
//   new Schema({
//     name: String
//   })
// );

// export default Role;