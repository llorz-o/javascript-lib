const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const stream = require("vinyl-source-stream");

const { series, watch, dest, src, task } = gulp;

function babel_tranfrom_task() {
  return src("src/**/*.js")
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              targets: "> 0.25%, not dead",
              modules: "commonjs",
            },
          ],
        ],
        plugins: ["@babel/plugin-proposal-class-properties"],
      })
    )
    .on("error", (err) => console.log(err))
    .pipe(dest("dist"));
}

function build_task(done) {
  babel_tranfrom_task();

  browserify({
    entries: "./dist/index.js",
    debug: true,
  })
    .bundle()
    .on("error", function (err) {
      console.log(err);
    })
    .pipe(stream("index.js"))
    .pipe(buffer())
    .pipe(dest("dist/bundle"));

  done();
}

function watch_task(done) {
  watch("src/**/*.js", build_task);
  done();
}

exports.watch = watch_task;
exports.default = build_task;
