/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); //? to be added in webpack.dev.js

module.exports = {
  //entry point
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  mode: 'development',

  //resolve is so that we dont have to put ts tsx js jsx file while importing

  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
  },
  devtool: 'inline-source-map', //better for dev as source code is mapped in bundled code //use source-map for prod for better debugging
  //? to be added in webpack.dev.js
  devServer: {
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, //here transpile all the js ts tsx jsx file with babel
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ], // @babel/preset-env transpiles es2015+ and preset-reackt transpiles react code
            },
          },
        ], // telling webpack to pipe the js ts files through babel. The loader will use Babel to compile modern es6+ files to es5
      },
      {
        //for css files
        test: /\.css$/i, //modify for scss
        use: ['style-loader', 'css-loader'],
      },
      {
        //for images files
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource', //treated as sepereate assets and emitted to the output
      },
      {
        //for svg files
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  // for emiting the output when building
  output: {
    path: path.resolve(__dirname, '..', '/build'), //resolve give absolute path
    filename: 'bundle.js',
  },

  //plugin for generating html file and injecting all the bundle to this file.

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),

    //experimental hot module replacement
    new ReactRefreshWebpackPlugin(),
  ],
};
