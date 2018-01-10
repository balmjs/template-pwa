var balm = require('balm');
var config = require('./config/balmrc');
require('./config/tasks');

balm.config = config;
balm.afterTask = 'bundle-sw';

balm.go();
