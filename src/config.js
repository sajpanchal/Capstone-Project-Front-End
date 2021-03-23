require("dotenv").config();

module.exports = {
  development: {
    NODE_APP_BASE_URL: "http://localhost:3001",
  },
  production: {
    NODE_APP_BASE_URL: process.env.NODE_APP_BASE_URL,
  },
};
