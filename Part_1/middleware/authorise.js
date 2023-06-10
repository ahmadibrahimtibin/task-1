const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { env } = require("../config/env");

const secretKey = env?.SECRET_KEY;

exports.verifyTokenAndImagePath = (req, res, next) => {
  const { image_path, token } = req.query;
  try {
    if (!image_path || !token) {
      return new ErrorResponse("Invalid token or image path.", 400).send(res);
    }
    const decoded = jwt.verify(token, secretKey);
    if (decoded.image_path !== image_path) {
      return new ErrorResponse("Invalid token or image path.", 400).send(res);
    }
    next();
  } catch (error) {
    console.error("Error verifying token and image path:", error);
    return new ErrorResponse("Invalid token or image path.", 400).send(res);
  }
};
