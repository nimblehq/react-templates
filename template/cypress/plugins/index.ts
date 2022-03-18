import browserify from '@cypress/browserify-preprocessor';
import task from '@cypress/code-coverage/task';

module.exports = (on, config) => {
  task(on, config);

  on(
    'file:preprocessor',
    browserify({
      typescript: require.resolve('typescript'),
    })
  );

  return config;
};
