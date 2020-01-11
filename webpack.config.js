const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    entry: [
      './index.ts',
      './index.sass'
    ],
    context: path.resolve(__dirname, 'src'),
    output: {
      filename: env === 'production' ? './js/jquery.MVPSlider.min.js' : './js/jquery.MVPSlider.js'
    },
    externals: {
      jquery: 'jQuery'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: "babel-loader",
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // },
        {
          test: /\.s[ac]ss$/i,
          use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', ],
        },
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    devtool: env === 'production' ? false : "source-map",
    plugins: [
      new MiniCssExtractPlugin({ 
        filename: env === 'production' ? './css/jquery.MVPSlider.min.css' : './css/jquery.MVPSlider.css'
      }),
      new HtmlWebpackPlugin({
        title:  'MVP range slider',
        template: 'index.html'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
      })
    ]
  }
};