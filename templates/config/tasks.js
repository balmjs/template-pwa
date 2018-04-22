var balm = require('balm');
var workboxBuild = require('workbox-build');

var DIST_DIR = balm.config.production ? 'dist' : '.tmp';

gulp.task('generate-sw', () => {
  return workboxBuild
    .injectManifest({
      globDirectory: DIST_DIR,
      globPatterns: ['**/*.{html,css,js,ico,png,svg}'],
      swDest: `${DIST_DIR}/sw.js`,
      swSrc: `${balm.config.roots.source}/service-worker.js`
    })
    .then(({ warnings }) => {
      for (const warning of warnings) {
        console.warn(warning);
      }
      console.info('Service worker generation completed.');
    })
    .catch(error => {
      console.warn('Service worker generation failed:', error);
    });
});
