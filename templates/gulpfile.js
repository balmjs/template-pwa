const balm = require('balm');
const config = require('./config/balmrc');
require('./config/tasks');

balm.config = config;
if (balm.config.isProd) {
  balm.afterTask = 'generate-sw';
}

balm.go(mix => {
  mix.copy(
    'node_modules/workbox-sw/build/workbox-sw.js',
    balm.config.isProd ? balm.config.roots.target : balm.config.roots.tmp
  );
});
