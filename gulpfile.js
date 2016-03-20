var gulp = require('gulp');
var watch = require('./gulp/watch');
var templates = require('./gulp/templates');

gulp.task('watch', watch);
gulp.task('templates', templates);