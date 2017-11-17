
export default function hijackConsole(onLog, onError) {

  // override console.log so it shows up in the console UI
  window.console.log = (function() {

    const log = console.log; // eslint-disable-line no-console

    return function() {

      // forward the call on to the real console.log
      log.apply(window.console, arguments);

      // write to our on screen console
      const output = getConsoleOutput(Array.prototype.slice.call(arguments));

      onLog(output);
    };
  }());

  window.console.error = (function() {
    var err = console.error;

    return function() {

      // forward the call on to the real console.err
      err.apply(window.console, arguments);

      // write to our on screen console
      const output = getConsoleOutput(Array.prototype.slice.call(arguments));

      onError(output);
    };
  }());

  // catch any random errors on the page (eg. inside a setTimeout)
  window.onerror = function(message, filename, lineno, colno, error) {
    console.error(message);
  };

}



// format the arguments for console logging
function getConsoleOutput(args) {

  try {
    // if an arg is an object, print out the JSON instead of [object Object]
    return args.map(function(arg){

      if (arg === null)               { return "null"; }
      if (typeof arg === "undefined") { return "undefined"; }
      if (typeof arg === "object")    { return JSON.stringify(arg, null, 1); }

      return arg.toString();
    }).join(" ");
  }
  catch(e){
    return args.toString();
  }
}
