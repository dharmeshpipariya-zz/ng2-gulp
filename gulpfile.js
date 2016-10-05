'use strict';

var gulp = require('gulp');
var del = require('del');
var gulpMerge = require('merge2');

gulp.task('clean', function (cb) {
  return del(['dist'], cb);
});

gulp.task('vendors1', ['clean'], function () {
  return gulp.src([
          '@angular/**',
          'core-js/client/**',
          'hammerjs/**',
          'rxjs/**',
          'systemjs/dist/**',
          'zone.js/dist/**'
  ], { cwd: 'node_modules/**' })
      .pipe(gulp.dest('dist/vendor'));
});

gulp.task('vendors2', ['clean'], function () {
  return gulpMerge(
    [
          '@angular',
          'core-js/client',
          'hammerjs',
          'rxjs',
          'systemjs/dist',
          'zone.js/dist'
    ].map(root => {
      console(root);
      const glob = path.join(__dirname, 'node_modules', root, '**/*.+(js|js.map)');
      return gulp.src(glob).pipe(gulp.dest(path.join('dist', 'vendor', root)));
    }));
});

gulp.task('vendors', ['clean'], function () {
  gulp.src(['node_modules/@angular/**']).pipe(gulp.dest('dist/vendor/@angular'));
  gulp.src(['node_modules/core-js/client/**']).pipe(gulp.dest('dist/vendor/core-js/client'));
  gulp.src(['node_modules/hammerjs/**']).pipe(gulp.dest('dist/vendor/hammerjs'));
  gulp.src(['node_modules/rxjs/**']).pipe(gulp.dest('dist/vendor/rxjs'));
  gulp.src(['node_modules/systemjs/dist/**']).pipe(gulp.dest('dist/vendor/systemjs/dist'));
  gulp.src(['node_modules/zone.js/dist/**']).pipe(gulp.dest('dist/vendor/zone.js/dist'));
});