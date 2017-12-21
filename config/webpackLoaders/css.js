import path from 'path';

module.exports = {
  test: /(\.css|\.scss|\.sass|\.less)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('autoprefixer')
        ],
        sourceMap: true
      }
    },{
      loader: 'less-loader',
      options: {
        includePaths: [path.resolve(__dirname, 'src', 'less')],
        sourceMap: true
      }
    }, {
      loader: 'sass-loader',
      options: {
        includePaths: [path.resolve(__dirname, 'src', 'scss')],
        sourceMap: true
      }
    }
  ]
};
