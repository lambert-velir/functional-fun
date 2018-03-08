import observeStore from "./redux/observeStore.js";
import { consoleMessages, clearConsole } from "./redux/console/consoleActions.js";
import pako from "./pako.js";
import R from "ramda";
import debounce from "lodash.debounce";

export default function initSandbox(store){

  if (!window.Worker){
    console.error("Your browser does not support web workers, bummer!");
    return;
  }

  const sandbox = new Worker("workers/sandbox-generated.js");



  // forward messages to the console UI
  sandbox.addEventListener("message", e => {

    // the results of running agains _code_
    // this code may or may not be what is currently in the editor
    const { messages, code } = e.data;

    // avoid race conditions by checking to see if the results of running the code
    // are from the code in the editor
    // it can be stale if maybe changes happen quickly, before the sandbox has a
    // chance to respond
    const isStale = code !== store.getState().code;

    if (!R.isNil(messages) && !isStale){
      store.dispatch(consoleMessages(messages));
    }
  });


  // send the new code to the sandbox web worker to compile
  // when it changes
  observeStore(store, state => state.code, debounce((newCode) => {
    updateHash(newCode);
    store.dispatch(clearConsole());
    sandbox.postMessage(newCode);
  }, 250));

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
