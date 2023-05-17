import { Schema, model } from "mongoose";

interface IPostSchema {
  title: string;
  content: string;
}

const PostSchema = new Schema<IPostSchema>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default model<IPostSchema>("Post", PostSchema);
