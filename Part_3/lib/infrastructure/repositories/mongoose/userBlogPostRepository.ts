import UserBlogPost, {
  IUserBlogPost,
} from "../../orm/mongoose/userBlogPostModel";

export interface IUserBlogPostRepository {
  create(userBlogPostData: IUserBlogPost): Promise<IUserBlogPost>;
  deleteByUserId(
    userId: string
  ): Promise<{ n?: number; ok?: number } & { deletedCount?: number }>;
  getByUserId(userId: string): Promise<IUserBlogPost[]>;
}

class UserBlogPostRepository implements IUserBlogPostRepository {
  async create(userBlogPostData: IUserBlogPost): Promise<IUserBlogPost> {
    return await UserBlogPost.create(userBlogPostData);
  }

  async deleteByUserId(
    userId: string
  ): Promise<{ n?: number; ok?: number } & { deletedCount?: number }> {
    return await UserBlogPost.deleteMany({ userId });
  }

  async getByUserId(userId: string): Promise<IUserBlogPost[]> {
    return await UserBlogPost.find({ userId }).populate("blogPostId");
  }
}

export default UserBlogPostRepository;
