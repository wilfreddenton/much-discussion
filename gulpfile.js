var gulp = require('gulp')
,   sass = require('gulp-sass')
,   livereload = require('gulp-livereload')
,   watch = require('gulp-watch')
,   rimraf = require('gulp-rimraf')
,   jshint = require('gulp-jshint')
,   browserify = require('browserify')
,   reactify = require('reactify')
,   source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  browserify('src/scripts/main.js')
    .transform('reactify')
    .bundle().on('error', function(err) {console.log(err)})
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(livereload());
});

gulp.task('lint', function() {
  return gulp.src('src/scripts/**/*.*')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('cleanAssets', function() {
  gulp.src('dist/assets/**/*.*')
    .pipe(rimraf());
});

gulp.task('copy', ['cleanAssets'], function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
  gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(livereload());
});

gulp.task('sass', function() {
  gulp.src('src/stylesheets/main.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(livereload());
});

gulp.task('default', ['browserify', 'sass', 'copy'], function() {
  livereload.listen();
  gulp.watch('src/scripts/**/*.js', ['browserify']);
  gulp.watch('src/index.html', ['copy']);
  watch('src/assets/**/*.*', function() {
    gulp.start('copy');
  });
  gulp.watch('src/stylesheets/main.scss', ['sass']);
});