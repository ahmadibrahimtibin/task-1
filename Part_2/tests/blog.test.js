const request = require("supertest");
const app = require("../index"); // Import your express app
const fs = require("fs");
const path = require("path");

// Test data
const blogPost = {
  title: "Test blog post",
  description: "This is a test blog post.",
  date_time: Math.floor(new Date().getTime() / 1000), // Unix timestamp
};

const image = fs.readFileSync(
  path.resolve(__dirname, "./mocks/images/additional_image_1_test-2.jpg")
); // Ensure the mock image file exists in your test directory

// path to the mock image file
const imagePath = path.resolve(__dirname, "./mocks/images/large_image.jpg");

// helper function to create a large image for testing
function createLargeImage() {
  // create a buffer with a size of 2MB
  const largeImage = Buffer.alloc(2 * 1024 * 1024);

  // write this buffer to a file
  fs.writeFileSync(imagePath, largeImage);
}

describe("Blog Posts API", () => {
  it("should create a new blog post successfully", async () => {
    const res = await request(app)
      .post("/api/blog-posts") // Replace with your actual blog post endpoint
      .field("title", blogPost.title)
      .field("description", blogPost.description)
      .field("date_time", blogPost.date_time)
      .attach(
        "main_image",
        image,
        "./mocks/images/additional_image_1_test-2.jpg"
      )
      .attach(
        "additional_images",
        image,
        "./mocks/images/additional_image_1_test-2.jpg"
      );

    const dateString = new Date(blogPost.date_time * 1000).toISOString();

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toHaveProperty("title", blogPost.title);
    expect(res.body.message).toHaveProperty(
      "description",
      blogPost.description
    );
    expect(res.body.message).toHaveProperty("date_time", dateString);
    expect(res.body.message).toHaveProperty(
      "main_image",
      "additional_image_1_test-2.jpg"
    );
    expect(res.body.message).toHaveProperty("additional_images", [
      "additional_image_1_test-2.jpg",
    ]);
  });

  it("should not create a new blog post when main image exceeds 1MB", async () => {
    const res = await request(app)
      .post("/api/blog-posts")
      .attach(
        "main_image",
        fs.readFileSync(
          path.join(__dirname, "./mocks/images/additional_image_1_test.jpg")
        ),
        "image_over_1MB.jpg"
      )
      .field("title", "Test blog post")
      .field("description", "This is a test blog post.")
      .field("date_time", Math.floor(Date.now() / 1000).toString());

    expect(res.statusCode).toEqual(400);
  });

  it("should not create a new blog post when title has special characters", async () => {
    const blogPost = {
      title: "Test blog post with special characters !@#",
      description: "This is a test blog post.",
      date_time: Math.floor(Date.now() / 1000).toString(),
    };

    const res = await request(app).post("/api/blog-posts").send(blogPost);

    expect(res.statusCode).toEqual(500);
  });

  it("should not create a new blog post when some required fields are missing", async () => {
    const partialBlogPost = {
      description: "This is a test blog post.",
      date_time: Math.floor(Date.now() / 1000).toString(),
    };

    const res = await request(app)
      .post("/api/blog-posts")
      .send(partialBlogPost);

    expect(res.statusCode).toEqual(500);
  });
});
