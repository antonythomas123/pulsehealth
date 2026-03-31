const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const { ModuleFederationPlugin } = webpack.container;
const envKeys = Object.keys(process.env)
  .filter((key) => key.startsWith("REACT_APP_"))
  .reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return acc;
  }, {});

module.exports = {
  entry: "./src/index.ts",
  mode: "development",

  devServer: {
    port: 3004,
    historyApiFallback: true,
  },

  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "analytics",
      filename: "remoteEntry.js",

      remotes: {
        main: `main@${process.env.REACT_APP_MAIN_REMOTE_URL}`,
      },

      exposes: {
        "./Analytics": "./src/App.tsx",
      },

      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-redux": { singleton: true, requiredVersion: "^9.2.0" },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: "^2.11.2" },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new webpack.DefinePlugin(envKeys),
  ],
};
