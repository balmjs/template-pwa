var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  roots: {
    source: 'app'
  },
  paths: {
    source: {
      css: 'styles',
      js: 'scripts',
      img: 'images'
    }
  },
  styles: {
    ext: 'css', // Default use PostCSS
    autoprefixer: ['last 1 version']
  },
  scripts: {
    entry: {
      main: './app/scripts/main.js' // Entry js file
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: require.resolve('workbox-sw'),
        to: 'workbox-sw.prod.js'
      }])
    ]
  },
  extras: {
    excludes: ['service-worker.js']
  }
  // More Config
  // https://github.com/balmjs/balm/blob/master/docs/configuration.md
};
