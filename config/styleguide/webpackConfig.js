module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /(\.css|\.scss|\.sass|\.less)$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};
