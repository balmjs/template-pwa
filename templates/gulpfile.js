/*eslint-env node*/
const balm = require('balm');
const config = require('./config/balmrc');

balm.config = config;

balm.go();
