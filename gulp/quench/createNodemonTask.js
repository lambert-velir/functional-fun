const gulp = require("gulp");
const quench = require("./quench.js");
const nodemon = require("nodemon");
const R = require("ramda");

module.exports = function(taskName, userConfig){

  const babelNode = "babel-node --presets env,react --plugins transform-class-properties,transform-object-rest-spread";

  const nodemonConfig = R.merge({
    execMap: {
      js: babelNode,
      jsx: babelNode
    }
    /**
     * nodemonConfig example:
     * {
     *   script: path.resolve(serverDir, "server.js"),
     *   args: ["--layout", layout],
     *   watch: [ serverDir ]
     * }
     */
  }, userConfig);

  gulp.task(taskName, function (cb) {

    let started = false;

    quench.logYellow("watching", "nodemod:", JSON.stringify(nodemonConfig.watch, null, 2));

    return nodemon(nodemonConfig)
      .on("start", function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
          cb();
          started = true;
        }
      })
      .on("restart", function () {
        console.log(`${taskName} - restarted!`);
      })
      .on("crash", function(e) {
        console.error(`${taskName} - server.js crashed!`);
        console.error(e);
        // stream.emit("restart", 10)  // restart the server in 10 seconds
      });
  });
};
