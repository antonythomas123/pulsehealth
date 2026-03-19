const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.ts",
  mode: "development",

  devServer: {
    port: 3002,
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
      name: "dashboard",
      filename: "remoteEntry.js",

      exposes: {
        // "./Dashboard": "./src/pages/Dashboard",
      },

      shared: {
        react: { singleton: true },
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
