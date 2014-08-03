var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	appMainBundle = {
		core : ['./styleSheets/core/bootstrap.css', './styleSheets/core/forms.css',
		        './styleSheets/core/input_group.css', './styleSheets/core/glyphicon.css',
		        './styleSheets/core/jquery-ui.css'],
		custom : ['./styleSheets/mmt_intl_flight.css', './styleSheets/intersitial.css']
	},
	rimraf = require('gulp-rimraf'),
	minifyCSS = require('gulp-minify-css');

gulp.task('clean', function() {
	return gulp.src('./build/**/*.css', { read : false })
				.pipe(rimraf());
});

gulp.task('concat', function () {
	gulp.src(appMainBundle.custom)
		.pipe(concatCss('app-main-bundle-custom.css'))
		.pipe(gulp.dest('./build'));
	gulp.src(appMainBundle.core)
		.pipe(concatCss('app-main-bundle-core.css'))
		.pipe(gulp.dest('./build/core'));
});

gulp.task('minify-css', function(){
	gulp.src('./build/app-main-bundle-custom.css')
		.pipe(minifyCSS( { keepSpecialComments : 0 } ))
		.pipe(gulp.dest('./build'));
	gulp.src('./build/core/app-main-bundle-core.css')
		.pipe(minifyCSS( { keepSpecialComments : 0 } ))
		.pipe(gulp.dest('./build/core'))
});