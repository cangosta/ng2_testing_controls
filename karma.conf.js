module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      {pattern: 'node_modules/es6-module-loader/dist/es6-module-loader.js', included: true, watched: true},
      {pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true},
      {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
      {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/angular2.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/router.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/http.dev.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true},
      {pattern: 'node_modules/traceur/bin/traceur-runtime.js', included: true, watched: true},
      {pattern: 'karma-test-shim.js', included: true, watched: true},

      // paths loaded via module imports
      {pattern: 'build/app/**/*.js', included: false, watched: true},

      // paths to tests
      {pattern: 'build/test/**/*.js', included: false, watched: true},

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      {pattern: 'build/**/*.html', included: false, watched: true}
    ],

    // proxied base paths
    proxies: {
      "/app/": "/base/build/app/"
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
