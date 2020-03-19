/* eslint-env node */
const path = require('path');

// Documentation - http://balmjs.com/docs/v2/config/
// 中文文档 - https://balmjs.com/docs/v2/zh/config/
module.exports = {
  roots: {
    source: 'app'
  },
  styles: {
    extname: 'css' // Default use PostCSS
  },
  scripts: {
    entry: {
      main: './app/scripts/main.js' // Entry js file
    },
    alias: {
      '@': path.resolve(__dirname, '../app/scripts')
    }
  },
  extras: {
    excludes: ['service-worker.js']
  },
  assets: {
    excludes: ['dist/img/icons/*.png']
  },
  pwa: {
    enabled: true,
    mode: 'injectManifest',
    options: {
      globPatterns: ['**/*.{html,css,js,ico,png,svg}']
    }
  }
  // More Config
};
