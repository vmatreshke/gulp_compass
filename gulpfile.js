var gulp         = require('gulp'),

    compass      = require('gulp-compass'),

    jade         = require('gulp-jade'),

    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed');

    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

//webserver
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
            // index: 'index.html'
        },
        files: ["css/*.css", "*.html", "js/**/*.js"],
        port: 8080,
        open: false,
        notify: false,
        ghostMode: false
    });
});

//jade
gulp.task('jade', function() {
    return gulp.src('jade/*.jade')
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(changed('./', {extension: '.html'}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'));
});

//compile all jade files
gulp.task('jade-all', function() {
    return gulp.src('jade/*.jade')
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'));
});

//compass
gulp.task('compass', function() {
    gulp.src('sass/**/*.sass')
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(compass({
            config_file: 'config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(gulp.dest('css'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('sass/**/*.sass', ['compass']);
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('jade/includes/*.jade', ['jade-all']);
    gulp.watch('jade/layouts/*.jade', ['jade-all']);
});

gulp.task('default',['browser-sync','watch'], function() {});