const express = require('express');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const slugify = require('slugify');
const morgan = require("morgan")

const app = express();
const port = 3000;

// Create the "images" directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

app.use(morgan("dev"))
// Enable file upload middleware
app.use(fileUpload());

// Load blogs from JSON file
let blogs = [];
const blogsFilePath = path.join(__dirname, 'blogs.json');
if (fs.existsSync(blogsFilePath)) {
  blogs = JSON.parse(fs.readFileSync(blogsFilePath));
}

// Initialize lastReferenceNumber


// Save blogs to JSON file
function saveBlogs() {
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs));
}

// Add blog post API
app.post('/api/blog-posts', (req, res) => {
  // Handle main image upload
  const mainImage = req.files.main_image;
  if (!mainImage) {
    return res.status(400).json({ error: 'Main image is required' });
  }

  lastReferenceNumber = blogs.length > 0 ? parseInt(blogs[blogs.length - 1].reference) : 0;
console.log({lastReferenceNumber})

  // Handle additional images upload
  const additionalImages = req.files.additional_images;

  // Process main image
  const mainImagePath = path.join(imagesDir, mainImage.name);
  mainImage.mv(mainImagePath, (err) => {
    if (err) {
      console.error('Error saving main image:', err);
      return res.status(500).json({ error: 'Error saving main image' });
    }

    // Process additional images
    const processedAdditionalImages = [];
    let processedCount = 0;

    const processAdditionalImage = (additionalImage) => {
      const additionalImagePath = path.join(imagesDir, additionalImage.name);
      additionalImage.mv(additionalImagePath, (err) => {
        if (err) {
          console.error(`Error saving additional image ${additionalImage.name}:`, err);
        } else {
          processedAdditionalImages.push(additionalImage.name);
        }

        processedCount++;

        // Check if all additional images have been processed
        if (processedCount === (Array.isArray(additionalImages) ? additionalImages.length : 1)) {
          // Generate reference number
          const referenceNumber = lastReferenceNumber + 1;
          console.log({referenceNumber});

          // Create blog post object
          const blogPost = {
            reference: referenceNumber.toString().padStart(5, '0'),
            title: req.body.title,
            description: req.body.description,
            main_image: mainImage.name,
            additional_images: processedAdditionalImages,
            date_time: moment.unix(req.body.date_time).toISOString(),
            title_slug: slugify(req.body.title, { lower: true, remove: /[*+~.()'"!:@]/g }),
          };

          // Add blog post to the list
          blogs.push(blogPost);

          // Save the blog post
          saveBlogs();

          // Update the last reference number
          lastReferenceNumber = referenceNumber;

          // Return the added blog post as JSON
          res.json(blogPost);
        }
      });
    };

    // Process each additional image
    if (Array.isArray(additionalImages)) {
      additionalImages.forEach(processAdditionalImage);
    } else if (additionalImages) {
      processAdditionalImage(additionalImages);
    }
  });
});

// Get all blog posts API
app.get('/api/blog-posts', (req, res) => {
  // Format date_time from unix timestamp to ISO string
  const formattedBlogs = blogs.map((blog) => ({
    ...blog,
    date_time: new Date(blog.date_time).toISOString(),
  }));

  res.json(formattedBlogs);
});

// Generate timed token for images API
app.get('/api/generate-token', (req, res) => {
  const { image_path } = req.query;

  // Generate token that expires after 5 minutes
  const token = jwt.sign({ image_path }, 'secret', { expiresIn: '5m' });

  res.json({ token });
});

// Get image by token API
app.get('/api/image', (req, res) => {
  const { image_path, token } = req.query;

  // Verify token
  try {
    const decoded = jwt.verify(token, 'secret');
    if (decoded.image_path !== image_path) {
      return res.status(400).json({ error: 'Invalid token or image path.' });
    }

    // Send back the image with appropriate content type
    const imagePath = path.join(imagesDir, image_path);
    res.type('jpg').sendFile(imagePath);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token or image path.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
