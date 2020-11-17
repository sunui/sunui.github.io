var gulp = require('gulp');
  connect = require('gulp-connect');
  watch = require('gulp-watch');

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['./'],
    port:9999
  });
});

gulp.task('livereload', function() {
  gulp.src(['css/*.css', 'js/*.js','*.html'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('css/*.css');
  gulp.watch('js/*.js');
  gulp.watch('*.html');
})

gulp.task('default', ['webserver', 'livereload', 'watch']);
