/*eslint no-undef: "error"*/
/*eslint-env node*/
const path = require('path');

// Documentation - http://balmjs.com/docs/en/configuration/toc.html
// 中文文档 - http://balmjs.com/docs/zh-cn/configuration/toc.html
module.exports = {
  roots: {
    source: 'app'
  },
  paths: {
    source: {
      css: 'styles',
      js: 'scripts',
      img: 'images'
    }
  },
  styles: {
    ext: 'css', // Default use PostCSS
    autoprefixer: ['last 1 version']
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
  pwa: {
    enabled: true,
    mode: 'injectManifest',
    options: {
      globPatterns: ['**/*.{html,css,js,ico,png,svg}']
    }
  }
  // More Config
};
