var balm = require('balm');
var config = require('./config/balmrc');
require('./config/tasks');

balm.config = config;
if (balm.config.production) {
  balm.afterTask = 'generate-sw';
}

balm.go(function(mix) {
  var to = balm.config.production
    ? balm.config.roots.target
    : balm.config.roots.tmp;
  mix.copy(`node_modules/workbox-sw/build/workbox-sw.js`, to);
});
