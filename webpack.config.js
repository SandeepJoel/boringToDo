const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js',
      publicPath: '/' // very critical change
    },
    devtool: 'source-map',
    devServer: {
      port: 8080,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].bundle.css'),
      new HtmlWebpackPlugin({
        title: 'ToDo App',
        template: './src/index.html',
        favicon: './assets/icons8-tick-box-50.png',
        minify: {
          collapseWhitespace: true,
        }
      }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false
      })
    ]
}
