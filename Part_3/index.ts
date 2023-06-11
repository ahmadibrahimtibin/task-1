// Remove the line: import "ts-node/register";

const bootstrap = require("./lib/infrastructure/config/bootstrap");
const createServer = require("./lib/infrastructure/webserver/server");

// Start the server
const start = async () => {
  try {
    await bootstrap.init();
    await createServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();