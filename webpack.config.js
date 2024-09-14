const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/client.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // Bundle output
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/index.html', // Updated template path
      filename: 'index.html', // Output to public/
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/style.css', to: './style.css' }
      ]
    }),
  ],
  mode: 'development',
};

