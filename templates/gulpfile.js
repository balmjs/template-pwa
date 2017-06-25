const balm = require('balm');
const wbBuild = require('workbox-build');

const SRC_DIR = balm.config.production ? 'dist' : 'app';
const DIST_DIR = balm.config.production ? 'dist' : '.tmp';
const SW_CONFIG = {
  globDirectory: `./${SRC_DIR}/`,
  swDest: `./${DIST_DIR}/service-worker.js`,
  staticFileGlobs: ['**/*']
};

gulp.task('bundle-sw', () => {
  return wbBuild.generateSW(SW_CONFIG)
    .then(() => {
      console.log('Service worker generated.');
    })
    .catch((err) => {
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
    }
  }
  // More Config
  // https://github.com/balmjs/balm/blob/master/docs/configuration.md
};

balm.go(function(mix) {
  mix.end(function() {
    gulp.start('bundle-sw');
  });
});
