var path = require('path');

module.exports = {
    entry: [
      //'webpack-dev-server/client?http://localhost:8080',
      //'webpack/hot/dev-server',
      path.resolve(__dirname, './app/main.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader', 
            'css-loader', 
            'sass-loader'
          ]
        }
      ]
    }
};
