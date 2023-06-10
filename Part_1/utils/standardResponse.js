module.exports.standardResponse = (
  res,
  message,
  status = 200,
  data = null,
  error = null,
  success = true
) => {
  const response = { message, status, success };
  if (data) {
    response.data = data;
  }
  if (error) {
    response.error = generateErrorObject(error);
    process.env.NODE_ENV !== "production"
      ? console.log(`Error: ${error.message}, Status: ${status}`)
      : null;
  }
  res.status(status).json(response);
};
const generateErrorObject = (error) => {
  return {
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  };
};
