/**
 *  See ./readme.md for usage
**/

// Include gulp and plugins
import gulp from "gulp";
import quench from "./quench/quench.js";
import path from "path";
import buildTask from "./tasks/build.js";


const projectRoot = path.resolve(__dirname, "..");

/**
 * gulp build
 *
 * to build for prduction/jenkins:
 *    gulp build --no-watch --env production
 */
gulp.task("build", buildTask(projectRoot));



/* gulp */
gulp.task("default", quench.logHelp);
