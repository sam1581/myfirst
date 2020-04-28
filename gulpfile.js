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

function watchAll(){
    watch("./*.md", md);
    
}

exports.default = parallel([watchAll,series([md])]);