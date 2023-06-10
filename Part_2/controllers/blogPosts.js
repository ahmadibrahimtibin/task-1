const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const {
  getBlogPosts,
  createBlogPost,
  getImage,
} = require("../services/blogPosts");
const ErrorResponse = require("../utils/errorResponse");
const { standardResponse } = require("../utils/standardResponse");
const { env } = require("../config/env");
const blogsFilePath = path.join(__dirname, "../blogs.json");
const secretKey = env?.SECRET_KEY;

exports.createBlogPost = async (req, res) => {
  const { title, description, date_time } = req.body;
  const mainImage = req.files.main_image;
  const additionalImages = req.files.additional_images;

  try {
    const blogPost = await createBlogPost(
      title,
      description,
      date_time,
      mainImage,
      additionalImages,
      req,
      res
    );
    if (!blogPost) {
      return new ErrorResponse("Error creating blog post", 400).send(res);
    } else {
      standardResponse(res, blogPost);
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return new ErrorResponse("Error creating blog post", 500).send(res);
  }
};

exports.getBlogPosts = (req, res) => {
  try {
    const formattedBlogs = getBlogPosts();
    standardResponse(res, formattedBlogs);
  } catch (error) {
    return new ErrorResponse("Error getting blog posts", 500).send(res);
  }
};

exports.generateToken = (req, res) => {
  try {
    const { image_path } = req.query;
    const token = jwt.sign({ image_path }, secretKey, { expiresIn: "5m" });
    standardResponse(res, { token });
  } catch (error) {
    return new ErrorResponse("Error generating token", 500).send(res);
  }
};

exports.getImage = (req, res) => {
  const { image_path } = req.query;
  try {
    const imageFilePath = getImage(image_path);
    res.type("jpg").sendFile(imageFilePath);
  } catch (error) {
    console.error("Error getting image:", error);
    return new ErrorResponse("Error getting image", 500).send(res);
  }
};
