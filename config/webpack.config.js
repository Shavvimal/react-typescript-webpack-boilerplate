const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const ROOT_DIRECTORY = path.join(__dirname, "../"); // the root of your project
const PUBLIC_DIRECTORY = path.join(ROOT_DIRECTORY, "public"); // the root of the frontend, i.e. html file

const config = {
  entry: [path.resolve(ROOT_DIRECTORY, "src/index.tsx")], // the main JavaScript file of the project
  output: {
    // instructions for compiling the code
    path: path.resolve(ROOT_DIRECTORY, "build"), // the file where the compiled code should go
    filename: "bundle.js", // the file name of the compiled code
    publicPath: "/", // specifies the base path for all the assets within your application.
  },
  mode: process.env.NODE_ENV || "development", // tells webpack to use its built-in optimizations according to the mode
  resolve: {
    // instructions on how to resolve modules
    extensions: [".tsx", ".ts", ".js"], // extensions that are used
    modules: [path.resolve("node_modules"), "node_modules"], // tells webpack where to look for node_modules
  },
  performance: {
    // notifies you if assets and entry points exceed a specific file limit
    hints: false, // MAKE FALSE ON PRODUCTION
  },
  plugins: [
    // plugins we are using to help with compiling
    new HtmlWebpackPlugin({
      // used to add the JavaScript code to the HTML
      template: path.join(PUBLIC_DIRECTORY, "index.html"),
      favicon: "src/favicon.svg",
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  module: {
    // helpers we want webpack to use
    rules: [
      // specific instructions for each helper
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      }, // transpile JavaScript files
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      }, // transpile TypeScript files
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      }, // transpile css files
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|pdf)$/,
        use: ["file-loader"],
      }, // transpile image files
      {
        test: /\.mp4$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "video",
            },
          },
        ],
      }, // transpile image files
    ],
  },
};

module.exports = config;
