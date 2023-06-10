const fs = require("fs");
const path = require("path");
const moment = require("moment");
const slugify = require("slugify");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const ErrorResponse = require("../utils/errorResponse");

const secretKey = env?.SECRET_KEY;

const blogsFilePath = path.join(__dirname, "../blogs.json");
const imagesDir = path.join(__dirname, "../images");

function saveBlogs(blogs) {
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs));
}

function moveImageToPath(image, imagePath) {
  return new Promise((resolve, reject) => {
    image.mv(imagePath, (err) => {
      if (err) {
        console.error(`Error saving image ${image.name}:`, err);
        reject(err);
      } else {
        resolve(image.name);
      }
    });
  });
}

exports.createBlogPost = async (
  title,
  description,
  date_time,
  mainImage,
  additionalImages,
  req,
  res
) => {
  try {
    const blogs = JSON.parse(fs.readFileSync(blogsFilePath));

    const lastReferenceNumber =
      blogs.length > 0 ? parseInt(blogs[blogs.length - 1].reference) : 0;

    const mainImagePath = path.join(imagesDir, mainImage.name);
    await moveImageToPath(mainImage, mainImagePath);

    const processedAdditionalImages = [];
    const processAdditionalImagePromises = [];

    const processAdditionalImage = (additionalImage) => {
      const additionalImagePath = path.join(imagesDir, additionalImage.name);
      const promise = moveImageToPath(additionalImage, additionalImagePath)
        .then((imageName) => {
          processedAdditionalImages.push(imageName);
        })
        .catch((error) => {
          console.error(
            `Error saving additional image ${additionalImage.name}:`,
            error
          );
        });

      processAdditionalImagePromises.push(promise);
    };

    if (Array.isArray(additionalImages)) {
      additionalImages.forEach(processAdditionalImage);
    } else if (additionalImages) {
      processAdditionalImage(additionalImages);
    }

    await Promise.all(processAdditionalImagePromises);

    const referenceNumber = lastReferenceNumber + 1;

    const blogPost = {
      reference: referenceNumber.toString().padStart(5, "0"),
      title,
      description,
      main_image: mainImage.name,
      additional_images: processedAdditionalImages,
      date_time: moment.unix(date_time).toISOString(),
    };

    blogs.push(blogPost);

    saveBlogs(blogs);

    return blogPost;
  } catch (error) {
    throw error;
  }
};

exports.getBlogPosts = () => {
  try {
    const blogs = JSON.parse(fs.readFileSync(blogsFilePath));

    const formattedBlogs = blogs.map((blog) => ({
      ...blog,
      date_time: new Date(blog.date_time).toISOString(),
      title_slug: slugify(blog.title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      })
        .toString()
        .toLowerCase()
        .replace(/-/g, "_")
        .trim(),
    }));

    return formattedBlogs;
  } catch (error) {
    throw error;
  }
};

exports.generateToken = (imagePath) => {
  try {
    const token = jwt.sign({ image_path: imagePath }, secretKey, {
      expiresIn: "5m",
    });
    return token;
  } catch (error) {
    throw error;
  }
};

exports.getImage = (imagePath) => {
  try {
    const imageFilePath = path.join(imagesDir, imagePath);
    return imageFilePath;
  } catch (error) {
    throw error;
  }
};
