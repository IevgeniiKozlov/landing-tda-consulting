const { watch, src, dest, series, parallel } = require("gulp");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

const clear = () => {
  return src('./build', {
    allowEmpty: true
  })
		.pipe(clean());
}

const buildHtml = () => {
  return src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./build/"))
    .pipe(browserSync.stream());
};

const buildSass = () => {
  return src("./src/styles/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(dest("./build/styles/"))
    .pipe(browserSync.stream());
};

const imagesOptimize = () => {
  return src("./src/images/*.{png,svg,jpg,jpeg}")
    .pipe(imagemin())
    .pipe(dest("./build/images"));
};

const build = series(clear, parallel(
  buildHtml, buildSass, imagesOptimize,
));

const runServer = () => {
  browserSync.init({
    open: false,
    server: "./build"
  });

  watch("./src/styles/**/*.scss", buildSass);
  watch("./src/*.html", buildHtml);
};

exports.develop = series(build, runServer);