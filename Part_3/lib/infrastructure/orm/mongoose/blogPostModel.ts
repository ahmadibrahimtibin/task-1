import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  content: string;
  userId: Schema.Types.ObjectId;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<IBlogPost>("BlogPost", blogPostSchema);
