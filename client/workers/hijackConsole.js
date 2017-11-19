
export default function hijackConsole(onLog, onError) {

  // override console.log so it shows up in the console UI
  console.log = function() { // eslint-disable-line no-console

    // write to our on screen console
    const output = getConsoleOutput(Array.prototype.slice.call(arguments));

    onLog(output);
  };

  console.error = function() {

    // write to our on screen console
    const output = getConsoleOutput(Array.prototype.slice.call(arguments));

    onError(output);
  };


  // catch any random errors on the page (eg. inside a setTimeout)
  onerror = function(message, filename, lineno, colno, error) {
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
