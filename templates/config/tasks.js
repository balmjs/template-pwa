var balm = require('balm');
var workboxBuild = require('workbox-build');

var DIST_DIR = balm.config.production ? 'dist' : '.tmp';

gulp.task('generate-sw', () => {
  return workboxBuild
    .injectManifest({
      swSrc: './app/service-worker.js',
      swDest: `${DIST_DIR}/sw.js`,
      globDirectory: DIST_DIR,
      globPatterns: ['**/*.{js,css,html,png}']
    })
    .then(() => {
      console.log('Service worker generated.');
    })
    .catch(err => {
      console.log('[ERROR] This happened: ' + err);
    });
});
