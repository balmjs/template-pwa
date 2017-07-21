const balm = require('balm');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const wbBuild = require('workbox-build');

const SRC_DIR = balm.config.production ? 'dist' : 'app';
const DIST_DIR = balm.config.production ? 'dist' : '.tmp';
const SW_CONFIG = {
  globDirectory: `./${SRC_DIR}/`,
  globPatterns: ['**/*'],
  globIgnores: ['service-worker.js'],
  swSrc: './app/service-worker.js',
  swDest: `./${DIST_DIR}/sw.js`
};

gulp.task('bundle-sw', () => {
  return wbBuild.injectManifest(SW_CONFIG)
    .then(() => {
      console.log('Service worker generated.');
    })
    .catch(err => {
      console.log('[ERROR] This happened: ' + err);
    });
});

balm.config = {
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

balm.go(mix => {
  mix.end(() => {
    gulp.start('bundle-sw');
  });
});
