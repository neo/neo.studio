'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

gulp.task('build', ['css', 'html', 'images', 'javascript']);

gulp.task('clean', function() {
	return gulp.src(['dist', 'src/*.css', 'src/*.js'], {read: false})
		.pipe($.clean());
});

gulp.task('javascript', ['scripts'], function() {
	return gulp.src('src/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('css', ['styles'], function() {
	return gulp.src('src/*.css')
		.pipe($.cssmin())
		.pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe($.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
	return gulp.src('src/images/*')
		.pipe($.imagemin())
		.pipe(gulp.dest('dist/images'));
});

gulp.task('styles', function() {
	return gulp.src('src/styles/*.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss([autoprefixer()]))
		.pipe(gulp.dest('./src'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return browserify('src/scripts/script.js').bundle()
		.pipe(source('script.js'))
		.pipe(gulp.dest('./src'))
		.pipe(browserSync.stream({once: true}));
});

gulp.task('default', ['styles', 'scripts'], function() {
	browserSync.init({
		server: './src'
	});
	gulp.watch('src/scripts/script.js', ['scripts'])
	gulp.watch('src/styles/*.scss', ['styles']);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});
