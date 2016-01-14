'use strict';

var del = require('del');
var gulp = require('gulp');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var karma = require('karma');

/* Server Configurations */
var SOURCE_DIR = 'src';
var BUILD_DIR = 'build';
/* END Server Configurations */

/* Bootstrap Dependencies */
var JS_EXTERNAL_DEPENDENCIES = [
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js',
    'node_modules/rxjs/bundles/Rx.js'
]
/* END Bootstrap Dependencies */

/* Constant Properties */

var JS_FILES = {
  source: [SOURCE_DIR+'/**/*.js'],
  build_destination: BUILD_DIR
}

var ASSETS_FILES = {
  SOURCE: [SOURCE_DIR+'/assets/**/*.*', '!'+SOURCE_DIR+'/assets/css/**/*.*'],
  build_destination: BUILD_DIR+'/assets'
}

var HTML_FILES = {
  source: [SOURCE_DIR+'/**/*.html'],
  build_destination: BUILD_DIR
}

var TRACEUR_OPTIONS = {
  experimental: true,
  annotations: true,
  memberVariables: true,
  typeAssertions: true,
  typeAssertionModule: 'rtts_assert/rtts_assert',
  types: true,
  moduleName: false,
  modules: 'instantiate' // Systemjs
}

/* END Constant Properties */

/* Tasks */

// Copy assets
gulp.task('copy:assets', function () {
  return gulp.src(ASSETS_FILES.SOURCE)
    .pipe(gulp.dest(ASSETS_FILES.build_destination));
});

// Copy HTML files
gulp.task('copy:html', function () {
  return gulp.src(HTML_FILES.source)
    .pipe(gulp.dest(HTML_FILES.build_destination));
});

// Transpile ES6 files
gulp.task('transpile', function () {
  return gulp.src(JS_FILES.source)
    .pipe(traceur(TRACEUR_OPTIONS))
    .pipe(gulp.dest(JS_FILES.build_destination));
});
/* END Tasks */

/* Main Tasks */

// Clean
gulp.task('clean', function () {
  return del(BUILD_DIR);
});

// Build
gulp.task('build', ['copy:html', 'copy:assets', 'transpile']);

// Run test once and exit
gulp.task('test', ['build'], function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Default
gulp.task('default', ['test']);

/* END Main Tasks */
