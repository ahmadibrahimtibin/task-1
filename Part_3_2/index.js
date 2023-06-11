const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const blogRoutes = require("./routes/blogPosts");
const path = require("path");
const { env } = require("./config/env");

const app = express();

const port = env?.PORT || 3000;

const imagesDir = path.join(__dirname, "./images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}
// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB:", error));

// Use routes

app.use(morgan("dev"));
app.use(fileUpload());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/blog-posts", blogRoutes);

app.listen(port, () => {
  console.log(
    `Server listening at http://localhost:${port} in ${env?.NODE_ENV} mode`
  );
});

module.exports = app;
