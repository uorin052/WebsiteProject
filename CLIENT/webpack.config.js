const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index.js',
  ],

  output: {
    publicPath: '/',
    filename: './main.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env']
           }  
        },
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'public/img/[name].[ext]',
            outputPath: 'dist/img/',
          },
        },
      },

      {
        test: /\.scss$/,
        use: [
            { 
              loader: MiniCssExtractPlugin.loader, 
              options: { minimize: true } 
            },
             'css-loader',
             'sass-loader'
            ],
        
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'public/fonts/[name].[ext]',
          outputPath: 'dist/fonts',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './resources/index.html',
      filename: 'index.html',
      hash: true,
    }),
  ],

  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    contentBase: './dist',
  },
};
