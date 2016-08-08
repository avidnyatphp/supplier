var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var path = require('path');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment


var cssTask = function (options) {
    if (options.development) {
      var run = function () {
        console.log(arguments);
        var start = new Date();
        console.log('Building CSS bundle');
        gulp.src('./styles/application.less')
        .pipe(plumber())
        .pipe(less({
          paths: [ path.join('./styles', 'less', 'includes') ]
        }).on('error', function(err){
          gutil.log(err);
          this.emit('end');
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(notify(function () {
            console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
        }));
      };
      run();
      gulp.watch('./styles/**/*.less', run);
    } else {
      gulp.src(options.src)
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));   
    }
}

// Starts our development workflow
gulp.task('default', function () {

  
  cssTask({
    development: true,
    src: './styles/**/*.css',
    dest: './build'
  });

});

gulp.task('deploy', function () {

  
  
  cssTask({
    development: false,
    src: './styles/**/*.css',
    dest: './dist'
  });

});