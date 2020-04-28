var { src, dest, series , parallel, watch } = require("gulp");
var markdown = require("gulp-markdown");
var inject = require("gulp-inject-string");

function md(){
    return src("./*.md")
    .pipe(markdown())
    .pipe(inject.prepend("<html><head></head><body>"))
    .pipe(inject.append("</body></html>"))
    .pipe(dest("./dist/") );
}

function js(){
    return src("./src/**/*.js")
    .pipe(dest("./dist/") );
}

function css(){
    return src("./src/**/*.css")
    .pipe(dest("./dist/") );
}

function html(){
    return src("./src/**/*.html")
    .pipe(dest("./dist/") );
}

function watchAll(){
    watch("./*.md", md);
    watch("./src/**/*.js", js);
    watch("./src/**/*.css", css);
    watch("./src/**/*.html", html);
}

exports.default = parallel([watchAll,series([md,js,css, html])]);

