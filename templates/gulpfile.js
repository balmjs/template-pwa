var balm = require('balm');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const PUBLIC_PATH = '';

balm.config = {
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
    publicPath: PUBLIC_PATH,
    plugins: [
      new SWPrecacheWebpackPlugin({
        cacheId: 'balm',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: PUBLIC_PATH + 'now/pwa/index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      })
    ]
  }
  // More Config
  // https://github.com/balmjs/balm/blob/master/docs/configuration.md
};

balm.go(function(mix) {
  if (balm.config.production) {
    mix.jsmin('./config/service-worker-prod.js', 'dist/js');
    mix.copy('./dist/js/service-worker-prod.js', 'dist/js', {
      basename: 'sw'
    });
    mix.remove('./dist/js/service-worker-prod.js');
    mix.copy('./app/manifest.json', 'dist');
  } else {
    mix.copy('./config/service-worker-dev.js', '.tmp/js', {
      basename: 'sw'
    });
  }
});
