/**
 *  See ./readme.md for usage
 **/

// Include gulp and plugins
const quench = require("./quench/quench.js");
const path = require("path");
const createBuildTask = require("./tasks/createBuildTasks.js");

const projectRoot = path.resolve(__dirname, "..");

/**
 * gulp build
 *
 * to build for prduction/jenkins:
 *    gulp build --no-watch --env production
 */
const build = createBuildTask(projectRoot);
build.description = "Build app";
exports.build = build;

/* gulp */
exports.default = quench.logHelp;
