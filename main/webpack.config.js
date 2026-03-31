const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const fs = require("fs");
const Dotenv = require("dotenv-webpack");

class CopyPublicAssetPlugin {
  constructor(assets) {
    this.assets = assets;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap("CopyPublicAssetPlugin", () => {
      const outputDirectory =
        compiler.options.output.path ||
        path.resolve(compiler.context, "dist");

      this.assets.forEach(({ from, to }) => {
        const sourcePath = path.resolve(compiler.context, from);
        const targetPath = path.resolve(outputDirectory, to);

        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.copyFileSync(sourcePath, targetPath);
      });
    });
  }
}

module.exports = {
  entry: "./src/index.ts",
  mode: "development",

  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
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
      filename: "remoteEntry.js",

      remotes: {
        auth: "auth@http://localhost:3001/remoteEntry.js",
        dashboard: "dashboard@http://localhost:3002/remoteEntry.js",
        patients: "patients@http://localhost:3003/remoteEntry.js",
        analytics: "analytics@http://localhost:3004/remoteEntry.js",
      },

      exposes: {
        "./components": "./src/components/index",
        "./notifications": "./src/notifications",
        "./redux/store": "./src/redux/store",
        "./redux/hooks": "./src/redux/hooks",
        "./redux/storeRegistry": "./src/redux/storeRegistry",
      },

      shared: {
        react: { singleton: true, requiredVersion: "^19.2.4" },
        "react-dom": { singleton: true },
        "react-redux": { singleton: true, requiredVersion: "^9.2.0" },
        "react-router-dom": { singleton: true, requiredVersion: "^7.13.1" },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: "^2.11.2" },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new Dotenv(),
    new CopyPublicAssetPlugin([{ from: "./public/sw.js", to: "sw.js" }]),
  ],
};
