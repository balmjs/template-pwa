var balm = require('balm');
var wbBuild = require('workbox-build');

var DIST_DIR = balm.config.production ? 'dist' : '.tmp';
var SW_CONFIG = {
  swSrc: './app/service-worker.js',
  swDest: `./${DIST_DIR}/sw.js`,
  globDirectory: `./${DIST_DIR}/`,
  globPatterns: ['**/*'],
  globIgnores: ['service-worker.js']
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
