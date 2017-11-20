const runSequence = require("run-sequence");
const path = require("path");

const quench                = require("../quench/quench.js");
const createCopyTask        = require("../quench/createCopyTask.js");
const createJsTask          = require("../quench/createJsTask.js");
const createSimpleJsTask    = require("../quench/createSimpleJsTask.js");
const createCssTask         = require("../quench/createCssTask.js");
const createBrowserSyncTask = require("../quench/createBrowserSyncTask.js");
const createNodemonTask     = require("../quench/createNodemonTask.js");

module.exports = function buildTask(projectRoot) {

  const buildDir = `${projectRoot}/build`;
  const clientDir = `${projectRoot}/client`;
  const serverDir = `${projectRoot}/server`;
  const examplesDir = `${clientDir}/examples`;

  return function(){

    createCopyTask("build-copy", {
      src: [
        `${clientDir}/index.html`,
        `${clientDir}/img/**`,
        `${clientDir}/examples/**`
      ],
      dest: buildDir,
      base: `${clientDir}`
    });


    createJsTask("build-js", {
      dest: `${buildDir}/js/`,
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
      // server: buildDir,
      proxy: "localhost:3030", // server.js creates this
      files: [
        buildDir
      ]
    });


    createNodemonTask("build-server", {
      script: path.resolve(serverDir, "server.jsx"),
      watch: [ serverDir, examplesDir ]
    });

    const buildTasks = ["build-js", "build-workers", "build-css", "build-copy"];

    if (quench.isWatching()){
      return runSequence(buildTasks, "build-server", "build-browser-sync");
    }
    else {
      return runSequence(buildTasks);
    }

  };

};
