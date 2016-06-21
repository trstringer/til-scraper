const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './web/main.js',
  output: {
    path: path.join(__dirname, '/public/javascripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      SOCKET_URL: "'http://localhost:3000'"
    })
  ]
};