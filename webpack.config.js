module.exports = {
  entry: './js/app.js', //Need to bundle files
  output: {
    path: __dirname, //Output path
    filename: "./js/bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    }]
  },
  devtool: 'source-map'
}
