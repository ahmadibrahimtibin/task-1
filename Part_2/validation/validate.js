const Validator = require("validator");
const isEmpty = require("./isEmpty");
const ErrorResponse = require("../utils/errorResponse");

module.exports.validateBlogPost = (req, res, next) => {
  const data = req.body;
  const main_image = req.files?.main_image;
  let errors = {};

  // Title Validation
  data.title = !isEmpty(data.title) ? data.title : "";
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  } else if (!Validator.isLength(data.title, { min: 5, max: 50 })) {
    errors.title = "Title must be between 5 and 50 characters";
  } else if (!Validator.matches(data.title, /^[a-zA-Z0-9\s]*$/)) {
    errors.title = "Title can only contain alphanumeric characters and spaces";
  }

  // Description Validation
  data.description = !isEmpty(data.description) ? data.description : "";
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  } else if (!Validator.isLength(data.description, { max: 500 })) {
    errors.description = "Description cannot exceed 500 characters";
  }

  // Main Image Validation (Validation for main image file extension will be done at file upload level)
  if (!req.files || !main_image) {
    errors.main_image = "Main image is required";
  }
  // Check image size 1 MB
  if (main_image.size > 1000000) {
    errors.main_image = "Image size should be less than 1 MB";
  }

  // Check image type (jpg)
  if (main_image.mimetype !== "image/jpeg") {
    errors.main_image = "Image type should be jpg";
  }

  // Date Time Validation
  if (!data.date_time || Validator.isEmpty(data.date_time)) {
    errors.date_time = "Date time field is required";
  } else if (!Validator.isNumeric(data.date_time)) {
    errors.date_time = "Date time must be a Unix timestamp";
  } else if (data.date_time > Date.now()) {
    errors.date_time = "Date time cannot be in the future";
  }

  if (Object.keys(errors).length > 0) {
    const errorMessages = Object.keys(errors).map((key) => ({
      message: errors[key],
    }));
    console.log(errorMessages);
    return new ErrorResponse(errorMessages[0].message, 400).send(res);
  } else {
    next();
  }
};
