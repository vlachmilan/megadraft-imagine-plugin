/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

module.exports = {
  entry: ["."],
  output: {
    path: __dirname + "/dist",
    publicPath: "/dist/",
    filename: "megadraft-imagine-plugin.js",
    library: "megadraft-imagine-plugin",
    libraryTarget: "umd"
  },
  externals: {
    megadraft: "Megadraft",
    react: "React",
    "react-dom": "ReactDOM"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};
