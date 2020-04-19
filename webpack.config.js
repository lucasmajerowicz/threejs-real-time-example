const webpack = require("webpack");
const path = require("path");
const appPath = path.join(__dirname, "app");
const distPath = path.join(__dirname, "dist");
const exclude = [/node_modules/];
const CleanPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  context: appPath,
  entry: {
    app: "./main.js",
  },
  output: {
    path: distPath,
    publicPath: "/",
    filename: "bundle.[hash].js",
  },
  plugins: [
    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./template.html",
    }),

    new webpack.ProvidePlugin({
      THREE: "three",
      // ...
    }),

    // Remove all files in dist before creating a production package
    // new CleanPlugin(["dist"]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: require.resolve("three"),
        loader: "expose?THREE",
      },
    ],
  },

  devServer: {
    contentBase: "./app",
  },
  resolve: {
    alias: {
      three$: "three/build/three.min.js",
      "three/.*$": "three",
      // don't need to register alias for every module
    },
    // ...
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
};

module.exports = config;
