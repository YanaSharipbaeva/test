'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglifycss = require('gulp-uglifycss'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function () {  
    return gulp.src('www', {read: false})
        .pipe(clean());
});

gulp.task('sass', function () {
    return gulp.src('dev/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dev/css'));
});
 
gulp.task('watch', function () {
    gulp.watch('dev/sass/**/*.scss', ['sass']);
});

gulp.task('autoprefixer', function () {
    return gulp.src('dev/css//**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('www/css'));
});

gulp.task('copy', function() {
    gulp.src('dev/fonts/*')
        .pipe(gulp.dest('www/fonts'));
});

gulp.task('imageMin', function () {
    return gulp.src('dev/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('www/images'));
});

gulp.task('cssMin', function () {
  return gulp.src('dev/css/*.css')
    .pipe(uglifycss())
    .pipe(gulp.dest('www/css'));
});

gulp.task('jsMin', function () {
  return gulp.src(['dev/js/*.js', '!dev/js/libs/**'])
    .pipe(uglify())
    .pipe(gulp.dest('www/js'));
});

gulp.task('build', function(callback) {
    runSequence(['clean'], 'sass','autoprefixer', 'copy', 
               'imageMin', 'jsMin','cssMin', callback);
});
