var path = require("path");

module.exports = {
  entry: {
    js: './js/app.js',
    jsx: './js/form.jsx'
  },
  output: {
    publicPath: '/js',
    path: path.join(__dirname, "js"),
    filename: "lameufquijouedans.bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
    },
    {
      test: /\.jsx?/,
      exclude: [/node_modules/],
      loader: 'babel'
    }]
  },
  devtool: 'source-map'
}
