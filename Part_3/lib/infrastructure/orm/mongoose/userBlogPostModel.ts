import mongoose, { Document, Schema } from "mongoose";

export interface IUserBlogPost extends Document {
  userId: Schema.Types.ObjectId;
  blogPostId: Schema.Types.ObjectId;
}

const userBlogPostSchema = new Schema<IUserBlogPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  blogPostId: {
    type: Schema.Types.ObjectId,
    ref: "BlogPost",
  },
});

export default mongoose.model<IUserBlogPost>(
  "UserBlogPost",
  userBlogPostSchema
);
