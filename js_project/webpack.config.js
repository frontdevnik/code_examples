const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const optimize = () => {
  const options = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    options.minimize = true;
    options.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ];
  }

  return options;
};

module.exports = {
  context: path.resolve(__dirname, 'src/'),

  entry: {
    main: './js/index.js',
    blog: './js/blog.js',
    pages: './js/pages.js',
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: isProd
            }
          }
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_module/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_module/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_module/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      excludeChunks: [ 'blog', 'pages' ],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      filename: 'blog.html',
      template: './blog.html',
      excludeChunks: [ 'main', 'pages' ],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      filename: 'pages.html',
      template: './pages.html',
      excludeChunks: [ 'blog', 'main' ],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: './img',
        to: path.resolve(__dirname, 'dist', 'img'),
      },
    ]),
  ],

  optimization: optimize(),

  devtool: isProd ? '' : 'source-map',

  devServer: {
    port: 9000,
    open: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
  },
};