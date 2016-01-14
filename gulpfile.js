'use strict';

var del = require('del');
var gulp = require('gulp');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var karma = require('karma');

/* Tasks */
gulp.task('copy:html', function () {
  return gulp.src(['src/**/*.html'])
    .pipe(gulp.dest('build'));
});

gulp.task('transpile', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(traceur({
      experimental: true,
      annotations: true,
      memberVariables: true,
      typeAssertions: true,
      typeAssertionModule: 'rtts_assert/rtts_assert',
      types: true,
      moduleName: false,
      modules: 'instantiate' // Systemjs
    }))
    .pipe(gulp.dest('build'));
});
/* END Tasks */

gulp.task('clean', function () { return del('build'); });
gulp.task('build', ['copy:html', 'transpile']);
gulp.task('test', ['build'], function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
gulp.task('default', ['test']);
