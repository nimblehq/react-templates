module.exports = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml'
      }
    }
  ]
};
