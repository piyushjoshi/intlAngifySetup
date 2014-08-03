"use strict";

var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	uglify = require('gulp-uglify'),
	rimraf = require('gulp-rimraf');

// JSHint task
gulp.task('lint', function() {
  gulp.src(['./main.js', './components/**/*.js', './init/**/*.js'])
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
  return gulp.src(['./build/raw-main-bundle-min.js', './build/raw-main-bundle-min.js.map'], { read: false })
    .pipe(rimraf());
});

gulp.task('compress', function() {
  gulp.src('raw-main-bundle.js')
    .pipe(uglify('raw-main-bundle-min.js',{ outSourceMap : true }))
    .pipe(gulp.dest('build'))
});