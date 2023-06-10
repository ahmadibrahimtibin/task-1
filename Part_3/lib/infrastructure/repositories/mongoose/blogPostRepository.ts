import BlogPost, { IBlogPost } from "../../orm/mongoose/blogPostModel";

export interface IBlogPostRepository {
  create(blogPostData: IBlogPost): Promise<IBlogPost>;
  getAll(): Promise<IBlogPost[]>;
  getById(blogPostId: string): Promise<IBlogPost | null>;
  updateById(
    blogPostId: string,
    updateData: Partial<IBlogPost>
  ): Promise<IBlogPost | null>;
  deleteById(blogPostId: string): Promise<IBlogPost | null>;
}

class BlogPostRepository implements IBlogPostRepository {
  async create(blogPostData: IBlogPost): Promise<IBlogPost> {
    return await BlogPost.create(blogPostData);
  }

  async getAll(): Promise<IBlogPost[]> {
    return await BlogPost.find().populate("userId");
  }

  async getById(blogPostId: string): Promise<IBlogPost | null> {
    return await BlogPost.findById(blogPostId).populate("userId");
  }

  async updateById(
    blogPostId: string,
    updateData: Partial<IBlogPost>
  ): Promise<IBlogPost | null> {
    return await BlogPost.findByIdAndUpdate(blogPostId, updateData, {
      new: true,
    });
  }

  async deleteById(blogPostId: string): Promise<IBlogPost | null> {
    return await BlogPost.findByIdAndDelete(blogPostId);
  }
}

export default BlogPostRepository;
