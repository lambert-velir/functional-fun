// format the arguments for console logging
export default function getConsoleOutput(args) {

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
