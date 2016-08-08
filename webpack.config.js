
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
   entry: [
   
	'./app/main.js',
  'whatwg-fetch'
       
   ],
   output: {
   	 path: './built/',
        filename: 'index.js'
   },
   devServer: {
      inline: true,
      port: 3333
   },
   module: {
      loaders: [
{
        test: /\.less$/,
        loader: "style!css!less"
      },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
              presets: ['es2015', 'react']
          }
	}
      ]
   },
plugins: [
        new ExtractTextPlugin("./main.css", {
            allChunks: true})
    ]
}
