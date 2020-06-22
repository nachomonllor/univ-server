const path = require('path')
const dotenv = require("dotenv").config({ path: path.join(__dirname, '../', '/.env') })
const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  authJwtSecret: process.env.AUTH_JWT_SECRET
};

module.exports = { config };
