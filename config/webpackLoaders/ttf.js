module.exports = {
  test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream'
      }
    }
  ]
};
