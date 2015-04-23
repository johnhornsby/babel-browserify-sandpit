'use strict';

var express = require('express');
var app = express();
var fs = require("fs");
app.use(require('connect-livereload')())
app.use(express.static(__dirname + '/public'));

app.listen(3000);


// Load plugins
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var coffee = require('gulp-coffee');
var server = lr();


// Coffee
gulp.task('coffee', function() {
    gulp.src('./public/assets/src/coffee/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./public/assets/src/js'))
});


// Javascript 
gulp.task('javascript', function () {
    browserify({ debug: true })
        .transform(babelify)
        .require("./public/assets/src/js/main.js", { entry: true })
        .bundle()
        .on("error", function (err) { console.log("Error: " + err.message); })
        .pipe(fs.createWriteStream("./public/assets/js/app.js"));
});


// Clean
gulp.task('clean', function() {
    return gulp.src(['./public/assets/js/**/*'], {read: false})
        .pipe(clean());
});


// Default task
gulp.task('default', ['clean'], function() {
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        };
      });

    gulp.start('coffee', 'javascript');

    // Watch Coffee files
    gulp.watch('./public/assets/src/coffee/**/*.coffee', ['coffee']);

    // Watch .js files
    gulp.watch('./public/assets/src/js/**/*.js', ['javascript']);
});