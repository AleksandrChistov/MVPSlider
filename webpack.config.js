const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    entry: [
      './jquery.MVPSlider.js',
      './jquery.MVPSlider.sass'
    ],
    context: path.resolve(__dirname, 'src'),
    output: {
      filename: env === 'production' ? './js/jquery.MVPSlider.min.js' : './js/jquery.MVPSlider.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', ],
        },
      ]
    },
    devtool: env === 'production' ? false : "source-map",
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ 
        filename: env === 'production' ? './css/jquery.MVPSlider.min.css' : './css/jquery.MVPSlider.css'
      }),
      new HtmlWebpackPlugin({
        title:  'MVP range slider',
        template: 'index.html'
        })
    ]
  }
};