import {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPostController";
import { Router } from "express";

const router = Router();

router.get("/", getBlogPosts);
router.get("/:id", getBlogPostById);
router.post("/", createBlogPost);
router.put("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;
