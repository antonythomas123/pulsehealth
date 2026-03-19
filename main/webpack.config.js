const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",

  devServer: {
    port: 3000,
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
      name: "main",

      remotes: {
        dashboard: "dashboard@http://localhost:3002/remoteEntry.js",
      },

      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true },
        "react-redux": { singleton: true },
        "@reduxjs/toolkit": { singleton: true },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
