const {series, watch, src, dest, parallel} = require('gulp');
const pump = require('pump');

// gulp plugins and utils
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass')(require('sass'));
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var beeper = require('beeper');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-mod-function');
var cssnano = require('cssnano');
var easyimport = require('postcss-easy-import');

function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    var processors = [
        easyimport,
        colorFunction(),
        autoprefixer(),
        cssnano()
    ];

    pump([
        src('assets/built/css/*.css', {sourcemaps: true}),
        postcss(processors),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function scss(done) {
    return src('assets/scss/*.scss')
      .pipe(sass().on('error', handleError(done)))
      .pipe(dest('assets/built/css'));
};

function js(done) {
    pump([
        src('assets/js/*.js', {sourcemaps: true}),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**'
        ]),
        zip(filename),
        dest(targetDir)
    ], handleError(done));
}

const buildStyles = series(scss, css)
const scssWatcher = () => watch('assets/scss/**', buildStyles);
const hbsWatcher = () => watch(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs'], hbs);
const watcher = parallel(scssWatcher, hbsWatcher);
const build = series(buildStyles, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;
