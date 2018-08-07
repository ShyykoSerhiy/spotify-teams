var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');

gulp.task('clean', function() {
    return del([
        'manifestbuild/**/*'
    ])
});

gulp.task('generate-manifest', function() {
    gulp.src(['manifest/*'])
        .pipe(zip('spotify-teams.zip'))
        .pipe(gulp.dest('manifestbuild'));
});

gulp.task('default', ['clean', 'generate-manifest'], function() {
    console.log('Build completed. Output in manifest folder');
});