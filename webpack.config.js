const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginInfo = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './client/index.html',
  minify: false,
});

module.exports = (env) => {
  console.log('exporting the webpack config object!');
  return {
    entry: './client/app.jsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    mode: process.env.Node_ENV,
    //mode: 'development',
    plugins: [HtmlWebpackPluginInfo],
    devServer: {
      static: {
        directory: path.resolve(__dirname, './build'),
        publicPath: '/',
      },
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?/, //files that ends in jsx or js
          exclude: path.resolve(__dirname, 'node_modules'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
  };
};

//& cross-env NODE_ENV = development nodemon server/server.js for the dev script
