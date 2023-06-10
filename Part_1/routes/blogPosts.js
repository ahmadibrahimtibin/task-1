const express = require("express");
const router = express.Router();
const {
  createBlogPost,
  getBlogPosts,
  generateToken,
  getImage,
} = require("../controllers/blogPosts");

const { verifyTokenAndImagePath } = require("../middleware/authorise");
const { validateBlogPost } = require("../validation/validate");

router.post("/", validateBlogPost, createBlogPost);
router.get("/", getBlogPosts);
router.get("/generate-token", generateToken);
router.get("/image", verifyTokenAndImagePath, getImage);

module.exports = router;
