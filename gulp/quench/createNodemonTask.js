const gulp = require("gulp");
const nodemon = require("nodemon");
const R = require("ramda");

module.exports = function(taskName, userConfig){

  const nodemonConfig = R.merge({
    execMap: {
      js: "babel-node --presets babel-preset-env"
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
      .on("crash", function() {
        console.error(`${taskName} - server.js crashed!`);
        // stream.emit("restart", 10)  // restart the server in 10 seconds
      });
  });
};
