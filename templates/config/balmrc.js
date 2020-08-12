const path = require('path');

// Documentation - https://balm.js.org/docs/config/
// 中文文档 - https://balm.js.org/docs/zh/config/
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
