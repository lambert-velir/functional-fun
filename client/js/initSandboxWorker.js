import observeStore from "./redux/observeStore.js";
import { consoleMessage, clearConsole } from "./redux/console/consoleActions.js";
import pako from "./pako.js";
import R from "ramda";
import debounce from "lodash.debounce";


// the current web worker. This will be used for running all code. if the code
// contains an infinite loop, sandbox will be respawned.
let sandbox = null;

// whether or not the sandbox is processing user code
let processing = false;
let queue = null;


export default function initSandbox(store){

  if (!window.Worker){
    console.error("Your browser does not support web workers, bummer!");
    return;
  }

  sandbox = spawnSandbox(store);

  // send the new code to the sandbox web worker to compile
  // when it changes
  observeStore(store, state => state.code, (newCode) => {
    updateHash(newCode);
    store.dispatch(clearConsole());
    runCode(newCode);
  });


  function runCode(code){

console.log("Running code");
    if (processing){
      console.log("SKIP!");
      queue = code;
      return;
    }

    processing = true;

    // start at timer, if it doesn't get cleared, it will terminate and re-spawn
    // the sandbox
    const confirmationId = setTimeout(() => {
      sandbox.terminate();
      sandbox = spawnSandbox(store); // respawn
      store.dispatch(clearConsole());
      store.dispatch(consoleMessage({
        type: "warn",
        message: "Your code is taking a long time.\n"
        + "Do you have an infinite loop??"
      }));
      if (queue){
        console.log("runnig  queue", queue);
        processing = false;
        const next = queue;
        queue = null;
        runCode(next);
      }
    }, 2000);

    sandbox.postMessage({ code, confirmationId });
  }
}



// make a web worker
function spawnSandbox(store){

  const sandbox = new Worker("workers/sandbox-generated.js");


  // forward messages to the console UI
  sandbox.addEventListener("message", e => {

    // the results of running agains _code_
    // this code may or may not be what is currently in the editor
    const { type, message, code, confirmationId } = e.data;


    // Infinate loop detection:
    // after the code has run, the sandbox should send back a confirmationId
    // use this ID to clear the timeout that was started in "runCode"
    if (typeof(confirmationId) !== "undefined"){
      processing = false;
      clearTimeout(confirmationId);
    }

    // avoid race conditions by checking to see if the results of running the code
    // are from the code in the editor
    // it can be stale if maybe changes happen quickly, before the sandbox has a
    // chance to respond
    const isStale = code !== store.getState().code;

    if (!R.isNil(type) && !R.isNil(message) && !isStale){
      store.dispatch(consoleMessage({ type, message }));
    }
  });

  return sandbox;
}


// update the hash after the user has stopped typing
const updateHash = debounce((newCode) => {

  const file = window.__EXAMPLES__.find(R.propEq("code", newCode));

  // if this code is the contents of a file, update
  // the hash to be the slug
  if (file){
    history.pushState(null, null, `#${file.slug}`);
  }
  else {
    pako.encryptCode(newCode)
      .matchWith({
        Ok: ({ value }) => {
          history.pushState(null, null, `#${value}`);
        },
        Error: ({ value }) => {
          console.error(value);
        }
      });
  }

}, 1000);
