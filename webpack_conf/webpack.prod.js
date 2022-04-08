import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";

import common from "./webpack.common.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export default merge(common, {
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      cache: false,
      filename: "main.html",
      inject: true,
      template: path.resolve(__dirname, "..", "client", "main.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
});
