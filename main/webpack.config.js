const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");
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
        auth: `auth@${process.env.REACT_APP_AUTH_REMOTE_URL}`,
        dashboard: `dashboard@${process.env.REACT_APP_DASHBOARD_REMOTE_URL}`,
        patients: `patients@${process.env.REACT_APP_PATIENTS_REMOTE_URL}`,
        analytics: `analytics@${process.env.REACT_APP_ANALYTICS_REMOTE_URL}`,
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

    new webpack.DefinePlugin(envKeys),
    new CopyPublicAssetPlugin([{ from: "./public/sw.js", to: "sw.js" }]),
  ],
};
