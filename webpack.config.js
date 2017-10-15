  var path = require('path')
  var webpack = require('webpack')

  module.exports = {
      module: {
          loaders: [{
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['es2015']
              }
          }, {
              test: /\.sass/,
              loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
          }, {
              test: /\.scss/,
              loader: 'style-loader!css!sass'
          }, {
              test: /\.css/,
              loader: 'style-loader!css!sass'
          }, {
              test: /\.(png|jpg|woff|woff2)$/,
              loader: 'url-loader?limit=8192'
          }],

      },
      watch: true,
      vue: {
          loaders: {
              js: 'babel'
          }
      },
      resolve: {
          alias: {
              'vue$': 'vue/dist/vue.common.js'
          }
      },
      devtool: '#eval-source-map',
      plugins: [
          new webpack.optimize.DedupePlugin(),
          new webpack.DefinePlugin({
              'process.env': {
                  'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
              }
          }),
          new webpack.optimize.UglifyJsPlugin({
              sourceMap: false,
              minimize: true,
              compress: {
                  drop_debugger: true,
                  warnings: false,
                  drop_console: true
              }
          })
      ]
  }