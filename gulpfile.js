const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const open = require('open');

gulp.task('run client', (cb) => {
  open('http://localhost:3000');
  cb();
});

gulp.task('bootstrap:copy', (cb) => {
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./public/stylesheets/'));

  cb();
});

gulp.task('copy:build', ['bootstrap:copy']);

gulp.task('webpack:build', (cb) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack] completed\n' + stats.toString({
      assets: true,
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: false,
      version: false
    }));
    cb();
  });
});

gulp.task('build', ['webpack:build', 'copy:build']);