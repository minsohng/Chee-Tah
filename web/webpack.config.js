const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const PORT = process.env.PORT || 8080;

const ENV = process.env.NODE_ENV || "development";

const config = {
  plugins: [
    new Dotenv({
      systemvars: true
    })
  ],
  mode: 'development',
  
  entry: './src/index.tsx',
  output: {
    filename: 'build.js',
    // path: ENV === "production" ? path.resolve(__dirname, '../server/build') : path.resolve(__dirname, 'build'),
    path: path.resolve(__dirname, 'build'),
    publicPath: '/js/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    historyApiFallback: true,
    port: PORT,
    compress: true,
    disableHostCheck: true,
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', 'gif', 'png', 'jpg', 'svg', 'jpeg']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(mp3|png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
};

module.exports = config;
