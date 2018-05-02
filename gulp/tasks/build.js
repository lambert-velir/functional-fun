import runSequence from "run-sequence";
import gulp from "gulp";
import path from "path";

import quench                from "../quench/quench.js";
import createCopyTask        from "../quench/createCopyTask.js";
import createJsTask          from "../quench/createJsTask.js";
import createSimpleJsTask    from "../quench/createSimpleJsTask.js";
import createCssTask         from "../quench/createCssTask.js";
import createBrowserSyncTask from "../quench/createBrowserSyncTask.js";
import createNodemonTask     from "../quench/createNodemonTask.js";

import heroes from "../../client/heroes/index.js";

import template from "gulp-template";
import getExamples from "../../server/getExamples.js";

module.exports = function buildTask(projectRoot) {

  const buildDir = `${projectRoot}/build`;
  const clientDir = `${projectRoot}/client`;
  const serverDir = `${projectRoot}/server`;
  const examplesDir = `${clientDir}/examples`;

  return function(){

    gulp.task("build-html", () => {
      // generate index.html with underscore templates
      return gulp.src(`${clientDir}/index.html`)
        .pipe(quench.drano())
        .pipe(template({
          examples: JSON.stringify(getExamples(examplesDir))
        }))
        .pipe(gulp.dest(buildDir));
    });
    quench.maybeWatch("build-html", [ examplesDir, `${clientDir}/index.html`]);


    gulp.task("build-heroes-json", () => {
      return gulp.src(`${clientDir}/heroes.json`)
        .pipe(quench.drano())
        .pipe(template({
          heroes: JSON.stringify(heroes, null, 2)
        }))
        .pipe(gulp.dest(buildDir));
    });
    quench.maybeWatch("build-heroes-json", [`${clientDir}/heroes/**/*`]);


    createCopyTask("build-copy", {
      src: [
        `${clientDir}/img/**`,
        `${clientDir}/data/**`
      ],
      dest: buildDir,
      base: `${clientDir}`
    });


    createJsTask("build-js", {
      dest: `${buildDir}/js/`,
      watch: `${clientDir}/db/**`,
      files: [
        {
          gulpTaskId: "build-js-index",
          entry: `${clientDir}/js/index.jsx`,
          filename: "index.js",
          watch: [
            `${clientDir}/js/**/*.js`,
            `${clientDir}/js/**/*.jsx`
          ]
        },
        {
          gulpTaskId: "build-js-polyfill",
          entry: `${clientDir}/polyfill/index.js`,
          filename: "polyfill.js",
          watch: [
            `${clientDir}/polyfill/**`
          ]
        }
      ]
    });

    createSimpleJsTask("build-workers", {
      dest: `${buildDir}/workers/`,
      entry: `${clientDir}/workers/sandbox.js`,
      watch: [
        `${clientDir}/workers/**/*.js`
      ]
    });

    createCssTask("build-css", {
      src: [
        `${clientDir}/scss/**/*.scss`,
        `${clientDir}/js/**/*.scss`
      ],
      dest: `${buildDir}/css/`,
      watch: [
        `${clientDir}/scss/**/*.scss`,
        `${clientDir}/js/**/*.scss`
      ],
      filename: "index.css"
    });


    createBrowserSyncTask("build-browser-sync", {
      server: buildDir,
      // proxy: "localhost:3030", // server.js creates this
      files: [
        buildDir
      ]
    });


    createNodemonTask("build-server", {
      script: path.resolve(serverDir, "server.jsx"),
      watch: [ serverDir, examplesDir ]
    });


    const buildTasks = [
      "build-js",
      "build-workers",
      "build-css",
      "build-copy",
      "build-html",
      "build-heroes-json"
    ];

    if (quench.isWatching()){
      return runSequence(
        buildTasks,
        // "build-server",
        "build-browser-sync"
      );
    }
    else {
      return runSequence(buildTasks);
    }

  };

};
