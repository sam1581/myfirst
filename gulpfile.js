var { src, dest, series, parallel, watch } = require("gulp");
var markdown = require("gulp-markdown");
var inject = require("gulp-inject-string");
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

function md() {
    return src("./*.md")
        .pipe(markdown())
        .pipe(inject.prepend("<html><head></head><body>"))
        .pipe(inject.append("</body></html>"))
        .pipe(dest("./dist/"));
}

function scss() {
    return src("./src/sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest("./dist/css"));
}

function js() {
    return src("./src/**/*.js")
        .pipe(dest("./dist/"));
}

function css() {
    return src("./src/**/*.css")
        .pipe(dest("./dist/"));
}

function html() {
    return src("./src/**/*.html")
        .pipe(dest("./dist/"));
}

function watchAll() {
    watch("./*.md", md);
    watch("./src/sass/*.scss", scss);
    watch("./src/**/*.js", js);
    watch("./src/**/*.css", css);
    watch("./src/**/*.html", html);
}

exports.default = parallel([watchAll, series([md, scss, js, css, html])]);