import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  description: string;
  images: string[];
  creator: IUser;
}

const PostSchema = new Schema({
  title: {
    required: "title is required",
    type: String,
  },
  description: {
    required: "description is required",
    type: String,
  },
  images: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model<IPost>("Post", PostSchema);

export default model;
