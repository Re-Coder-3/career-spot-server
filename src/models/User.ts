import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  favorite: string;
  profileImage: string;
}

const UserSchema = new Schema({
  email: {
    required: "email is required",
    type: String,
  },
  username: {
    required: "username is required",
    type: String,
  },
  password: {
    required: "password is required",
    type: String,
  },
  favorite: String,
  profileImage: String,
});

const model = mongoose.model<IUser>("User", UserSchema);

export default model;
