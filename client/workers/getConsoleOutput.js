import R from "ramda";
import Maybe from "folktale/maybe";
import Result from "folktale/result";

// format the arguments for console logging
export default function getConsoleOutput(...args) {
  try {
    // Any -> Boolean
    const typeIs = type =>
      R.compose(
        R.equals(type),
        R.type,
      );

    // const jsonReplacer = (key, value) => R.when(
    //   typeIs("Function"),
    //   getConsoleOutput
    // )(value);

    return R.compose(
      R.join(" "),
      R.map(
        R.cond([
          [typeIs("Null"), () => "null"],
          [typeIs("Undefined"), () => "undefined"],
          [typeIs("String"), string => `"${string.toString()}"`],
          [
            // if an object has it's own toString, use that
            // instead of JSON.stringify
            R.has("toString"),
            arg => arg.toString(),
          ],
          [R.has("unbox"), box => `Box(${getConsoleOutput(box.unbox())})`],
          [
            arg => Maybe.hasInstance(arg),
            maybe =>
              maybe.matchWith({
                Just: ({ value }) => `Just(${getConsoleOutput(value)})`,
                Nothing: () => "Nothing()",
              }),
          ],
          [
            arg => Result.hasInstance(arg),
            result =>
              result.matchWith({
                Ok: ({ value }) => `Ok(${getConsoleOutput(value)})`,
                Error: ({ value }) => `Error(${getConsoleOutput(value)})`,
              }),
          ],
          [
            arg =>
              !R.isNil(arg._computation) &&
              !R.isNil(arg.run) &&
              !R.isNil(arg.mapRejected),
            task => "Task()",
          ],
          [
            arg =>
              !R.isNil(arg._task) &&
              !R.isNil(arg._deferred) &&
              !R.isNil(arg.listen),
            taskExecution => "TaskExecution()",
          ],
          [
            // if an arg is an object, print out the JSON instead of [object Object]
            typeIs("Object"),
            arg => JSON.stringify(arg, null, 2),
          ],
          [
            // if an arg is an array, print out the JSON instead of [object Object]
            typeIs("Array"),
            arg => JSON.stringify(arg, null, 2),
          ],
          [R.T, arg => arg.toString()],
        ]),
      ),
    )(args);
  }
  catch (e) {
    return args.join(" ");
  }
}
