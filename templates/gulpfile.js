var balm = require('balm');
var config = require('./config/balmrc');
require('./config/tasks');

balm.config = config;
if (balm.config.production) {
  balm.afterTask = 'generate-sw';
}

balm.go(function(mix) {
  mix.copy(
    'node_modules/workbox-sw/build/workbox-sw.js',
    balm.config.production ? balm.config.roots.target : balm.config.roots.tmp
  );
});
