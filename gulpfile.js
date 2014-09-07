var gulp    = require('gulp');
var fc2json = require('./index');

gulp.task('default', function() {
  gulp.src('my-files/**/*')
      .pipe(fc2json('contents.json'))
      .pipe(gulp.dest('./dist/'));
});
