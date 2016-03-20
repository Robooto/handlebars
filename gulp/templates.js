var gulp = require('gulp');
var path = require('path');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var debug = require('gulp-debug');

module.exports = function() {
  // partials stream 
  var partials = gulp.src('./templates/_*.hbs') 
    //handlebars
    .pipe(handlebars())
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
        imports: {
            processPartialName: function(fileName) {
                return JSON.stringify(path.basename(fileName, '.js').substr(1));
            }
        }
    }));
    //wrap inline javascript
    
    // template stream
    var templates = gulp.src('./templates/[^_]*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }));
    // wrap
    // namespaces
    
    //return merge
    return merge(partials, templates)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./build/js/'));
        //concat
        //build  
};