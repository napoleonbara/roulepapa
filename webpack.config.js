const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|mp3)$/i,
        type: 'asset/resource',
      },    
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/html/vampire.html", to: "vampire.html" },
      ],
    }),
  ],    
};
