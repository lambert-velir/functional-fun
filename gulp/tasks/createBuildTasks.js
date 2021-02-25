const gulp = require("gulp");

const quench = require("../quench/quench.js");
const runCopyTask = require("../quench/runCopyTask.js");
const runJsTask = require("../quench/runJsTask.js");
const runSassTask = require("../quench/runSassTask.js");
const runBrowserSyncTask = require("../quench/runBrowserSyncTask.js");

const heroes = require("../../client/heroes-db/heroes.js");

const template = require("gulp-template");
const getExamples = require("./getExamples.js");

module.exports = function createBuildTasks(projectRoot) {
  const buildDir = `${projectRoot}/build`;
  const clientDir = `${projectRoot}/client`;
  const examplesDir = `${clientDir}/examples`;

  const html = () => {
    // generate index.html with underscore templates
    const htmlTask = () =>
      gulp
        .src(`${clientDir}/index.html`)
        .pipe(quench.drano())
        .pipe(
          template({
            examples: JSON.stringify(getExamples(examplesDir)),
          }),
        )
        .pipe(gulp.dest(buildDir));

    quench.maybeWatch(
      [examplesDir, `${clientDir}/index.html`],
      htmlTask,
      "html:",
    );

    return htmlTask();
  };

  const heroJson = () => {
    const heroJsonTask = () =>
      gulp
        .src(`${clientDir}/heroes-db/heroes.json`)
        .pipe(quench.drano())
        .pipe(
          template({
            heroes: JSON.stringify(heroes, null, 2),
          }),
        )
        .pipe(gulp.dest(`${buildDir}/docs/`));

    quench.maybeWatch([`${clientDir}/heroes/**/*`], heroJsonTask, "heroJson:");

    return heroJsonTask();
  };

  const copy = () =>
    runCopyTask({
      src: [
        `${clientDir}/img/**`,
        `${clientDir}/data/**`,
        `${clientDir}/docs/**/*.html`,
      ],
      dest: buildDir,
      base: `${clientDir}`,
    });

  const js = () =>
    runJsTask({
      dest: `${buildDir}/js/`,
      watch: `${clientDir}/heroes-db/**`,
      files: [
        {
          entry: `${clientDir}/js/index.jsx`,
          filename: "index.js",
          watch: [`${clientDir}/js/**/*.js`, `${clientDir}/js/**/*.jsx`],
        },
        {
          entry: `${clientDir}/polyfill/index.js`,
          filename: "polyfill.js",
          watch: [`${clientDir}/polyfill/**`],
        },
      ],
    });

  const buildWorker = () =>
    runJsTask({
      dest: `${buildDir}/workers/`,
      files: [
        {
          entry: `${clientDir}/workers/sandbox.js`,
          filename: "sandbox.js",
          watch: [`${clientDir}/workers/**/*.js`],
        },
      ],
      libraries: false,
    });

  const css = () =>
    runSassTask({
      src: [`${clientDir}/scss/**/*.scss`, `${clientDir}/js/**/*.scss`],
      dest: `${buildDir}/css/`,
      watch: [`${clientDir}/scss/**/*.scss`, `${clientDir}/js/**/*.scss`],
      filename: "index.css",
    });

  const docsCss = () =>
    runSassTask({
      src: `${clientDir}/docs/**/*.scss`,
      dest: `${buildDir}/docs/`,
      filename: "docs.css",
    });

  const browserSync = () =>
    runBrowserSyncTask({
      server: buildDir,
      files: [buildDir],
    });

  const buildTasks = [html, heroJson, copy, js, buildWorker, css, docsCss];

  if (quench.isWatching()) {
    return gulp.series(buildTasks, browserSync);
  } else {
    return gulp.series(buildTasks);
  }
};
