import observeStore from "./redux/observeStore.js";
import {
  consoleMessages,
  consoleMessage,
  clearConsole,
} from "./redux/console/consoleActions.js";
import pako from "./pako.js";
import R from "ramda";
import debounce from "lodash.debounce";

// the current web worker. This will be used for running all code. if the code
// contains an infinite loop, sandbox will be respawned.
let sandbox = null;

// whether or not the sandbox is processing user code
let processing = false;
let queue = null;

// for debugging
function logIt(...args) {
  // console.log(...args);
}

export default function initSandbox(store) {
  if (!window.Worker) {
    console.error("Your browser does not support web workers, bummer!");
    return;
  }

  sandbox = spawnSandbox(store);

  // send the new code to the sandbox web worker to compile
  // when it changes
  observeStore(
    store,
    state => state.code,
    debounce(newCode => {
      updateHash(newCode);
      store.dispatch(clearConsole());
      logIt("code has changed!");
      runCode(newCode);
    }, 250),
  );

  function runCode(code) {
    logIt("Running code");

    if (processing) {
      logIt("SKIP!");
      queue = code;
      return;
    }

    processing = true;

    // start a timer, if it doesn't get cleared, it will terminate and re-spawn
    // the sandbox
    const confirmationId = setTimeout(() => {
      logIt("timout expired:", confirmationId);

      store.dispatch(clearConsole());
      store.dispatch(
        consoleMessage({
          type: "warn",
          message:
            "Your code is taking a long time.\n" +
            "Do you have an infinite loop??",
        }),
      );

      sandbox.terminate();
      sandbox = spawnSandbox(store); // respawn
      processing = false;

      // if there were changes while the inifite loop was running, run that code
      // after it's done
      if (queue) {
        logIt("running  queue", queue);
        const next = queue;
        queue = null;
        store.dispatch(clearConsole());
        runCode(next);
      }
    }, 2000);

    logIt("timeout created:", confirmationId);

    sandbox.postMessage({ code, confirmationId });
  }
}

// make a web worker
function spawnSandbox(store) {
  const sandbox = new Worker("workers/sandbox-generated.js");

  // forward messages to the console UI
  sandbox.addEventListener("message", e => {
    // the results of running against _code_
    // this code may or may not be what is currently in the editor
    const { messages, code, confirmationId } = e.data;

    // Infinate loop detection:
    // after the code has run, the sandbox should send back a confirmationId
    // use this ID to clear the timeout that was started in "runCode"
    if (typeof confirmationId !== "undefined") {
      processing = false;
      logIt("code done", confirmationId, processing);
      clearTimeout(confirmationId);
    }

    // avoid race conditions by checking to see if the results of running the code
    // are from the code in the editor
    // it can be stale if maybe changes happen quickly, before the sandbox has a
    // chance to respond
    const isStale = code !== store.getState().code;

    if (!R.isNil(messages) && !isStale) {
      store.dispatch(consoleMessages(messages));
    }
  });

  return sandbox;
}

// update the hash after the user has stopped typing
const updateHash = debounce(newCode => {
  const file = R.compose(
    R.find(R.propEq("code", newCode)),
    R.chain(R.prop("examples")), // flat list of examples
  )(window.__EXAMPLES__);

  // if this code is the contents of a file, update
  // the hash to be the slug
  if (file) {
    history.pushState(null, null, `#${file.slug}`);
  }
  else {
    pako.encryptCode(newCode).matchWith({
      Ok: ({ value }) => {
        history.pushState(null, null, `#${value}`);
      },
      Error: ({ value }) => {
        console.error(value);
      },
    });
  }
}, 1000);
