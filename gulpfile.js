//  requires

const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const tinypng = require('gulp-tinypng-compress');
const fileinclude = require('gulp-file-include');
const htmlbeautify = require('gulp-html-beautify');
const sourcemaps = require('gulp-sourcemaps');
const cssbeautify = require('gulp-cssbeautify');

//  sass and vendor prefixes

const autoprefixerOptions = {
    browsers: [
        'last 2 version',
        'safari 5',
        'ie 7', 'ie 8', 'ie 9',
        'opera 12.1',
        'ios 6', 'android 4'
    ]
};

gulp.task('styles', function() {
    gulp.src('css/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('sourcemaps/'))
        .pipe(gulp.dest('css'))
});

//  copy js

gulp.task('copyjs', function() {
    gulp.src('js/*.{,js}')
        .pipe(gulp.dest(''));
});

//  webserver - launch localhost

gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            port: 4000
        }));
});

//  run tasks + watch

gulp.task('default', ['styles', 'copyjs', 'webserver', 'watch']);
gulp.task('watch', function() {
    gulp.watch('css/sass/*.scss',['styles']);
    gulp.watch('js/*.js', ['copyjs']);
})
