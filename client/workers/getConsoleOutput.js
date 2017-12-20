import R from "ramda";

// format the arguments for console logging
export default function getConsoleOutput(...args) {

  try {
    // Any -> Boolean
    const typeIs = type => R.compose(R.equals(type), R.type);

    return R.compose(
      R.join(" "),
      R.map(R.cond([
        [
          typeIs("Null"),
          () => "null"
        ],
        [
          typeIs("Undefined"),
          () => "undefined"
        ],
        [
          typeIs("String"),
          string => `"${string.toString()}"`
        ],
        [ // if an object has it's own toString, use that
          // instead of JSON.stringify
          R.has("toString"),
          arg => arg.toString()
        ],
        [ // if an arg is an object, print out the JSON instead of [object Object]
          R.anyPass([typeIs("Object"), typeIs("Array")]),
          arg => JSON.stringify(arg, null, 2)
        ],
        [
          R.T,
          arg => arg.toString()
        ]
      ]))
    )(args);
  }
  catch(e){
    return args.join(" ");
  }
}
