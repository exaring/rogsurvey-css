var autoprefixer = require('autoprefixer');
var gulp         = require('gulp');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var cssnanon     = require('cssnano');

var src   = 'src/';
var dist  = './';
var paths = {
  styles: {
    src:  src  + '*.scss',
    dest: dist + '',
    watch: src + '**/*'
  },
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe( sass())
    .pipe( postcss([
        autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
        cssnanon({ preset: 'default' }),
    ]) )
    .pipe( gulp.dest(paths.styles.dest))
    .pipe( notify('styles passed'));
}

function watch() {
  gulp.watch(paths.styles.watch, styles);
}

var build = gulp.parallel(styles);

gulp.task('watch', watch);
gulp.task('default', build);
