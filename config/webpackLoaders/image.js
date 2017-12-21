module.exports = {
  test: /\.(jpe?g|png|gif|ico)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }
  ]
};
