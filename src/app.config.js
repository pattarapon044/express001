require("dotenv").config();
require("colors");

module.exports = {
  api: process.env.API || "http://localhost:5000/api",
  path: __dirname,
  port: process.env.PORT || 5000,
  listen: () => {
    console.log(
      "[completed]".green +
        " Listening on : " +
        `${process.env.API || "http://localhost:5000/api"}`.cyan
    );
  },
};
