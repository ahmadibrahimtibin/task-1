import { Request, Response } from "express";
import UserRepository from "../../infrastructure/repositories/mongoose/userRepository";
import BlogPostRepository from "../../infrastructure/repositories/mongoose/blogPostRepository";
import UserBlogPostRepository from "../../infrastructure/repositories/mongoose/userBlogPostRepository";
import { IBlogPost } from "../../infrastructure/orm/mongoose/blogPostModel";

const userRepository = new UserRepository();
const blogPostRepository = new BlogPostRepository();
const userBlogPostRepository = new UserBlogPostRepository();

export const getBlogPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const blogPosts: IBlogPost[] = await blogPostRepository.getAll();
  res.json(blogPosts);
};

export const getBlogPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const blogPostId: string = req.params.id;
  const blogPost: IBlogPost | null = await blogPostRepository.getById(
    blogPostId
  );
  if (!blogPost) return res.status(404).send("Blog Post not found");
  res.json(blogPost);
};

export const createBlogPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const blogPostData: IBlogPost = req.body;

  // Here, you need to implement your validation logic for the blog post data.

  const userId: string = req.user._id;
  const user = await userRepository.getById(userId);
  if (!user) return res.status(404).send("User not found");

  const blogPost: IBlogPost = await blogPostRepository.create({
    ...blogPostData,
    userId,
  });
  await userBlogPostRepository.create({ userId, blogPostId: blogPost._id });

  res.status(201).json(blogPost);
};

export const updateBlogPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const blogPostData: Partial<IBlogPost> = req.body;

  // Here, you need to implement your validation logic for the blog post data.

  const blogPostId: string = req.params.id;
  const updatedBlogPost: IBlogPost | null = await blogPostRepository.updateById(
    blogPostId,
    blogPostData
  );

  if (!updatedBlogPost) return res.status(404).send("Blog Post not found");
  res.json(updatedBlogPost);
};

export const deleteBlogPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const blogPostId: string = req.params.id;
  const deletedBlogPost: IBlogPost | null = await blogPostRepository.deleteById(
    blogPostId
  );

  if (!deletedBlogPost) return res.status(404).send("Blog Post not found");
  res.json(deletedBlogPost);
};
