const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.js",
    signup: "./src/signup.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
