"use strict";

var gulp = require('gulp'),
	uglify = require('gulp-uglifyjs'),
	concat = require('gulp-concat'),
	rimraf = require('gulp-rimraf'),
	fileList = ['./lib/jquery-1.10.1.min.js', './lib/bootstrap.min.js',
		          './lib/jquery.jcarousel.js', './lib/jcarousel.skeleton.js',
		          './lib/jquery.sticky-kit.min.js', './custom/custom.js',
		          './lib/jquery.ui.core.min.js', './lib/jquery.ui.widget.min.js',
		          './lib/jquery.ui.mouse.min.js', './lib/jquery.ui.slider.min.js',
		          './lib/jquery.ui.touch-punch.min.js'],
	fileListIE8Shiv = ['./lib/html5shiv.js', './lib/respond.min.js'];

gulp.task('clean', function() {
  return gulp.src('./build/*.js', { read: false })
    .pipe(rimraf());
});

gulp.task('concat', function(){
	gulp.src(fileList)
		.pipe(concat('ui-dependencies.js', {newLine: ';'}))
		.pipe(gulp.dest('./build'));
	
	gulp.src(fileListIE8Shiv)
		.pipe(concat('ui-ie8shiv.js'), {newLine: ';'})
		.pipe(gulp.dest('./build'));
});

gulp.task('uglify', function() {
	gulp.src(fileList)
		.pipe(uglify('ui-dependencies-min.js', { outSourceMap : true }))
		.pipe(gulp.dest('./build'));
	
	gulp.src(fileListIE8Shiv)
		.pipe(uglify('ui-ie8shiv-min.js',{ outSourceMap : true }))
		.pipe(gulp.dest('./build'));
});
