var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'electron',
  node: {
    __dirname: false
  },
  externals:  {
    'pg' : true,
    'pg-hstore' :true,
    'tedious' : true,
    'mysql2' : true,
    "sequelize": "require('sequelize')"
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader", // compiles Sass to CSS
      }]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=80000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.node/,
      loader: 'node-loader'
    }]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.less'],
    modules: [
        path.resolve('./'),
        path.resolve('./node_modules')
    ],
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
};