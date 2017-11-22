import observeStore from "./redux/observeStore.js";
import { consoleMessage, clearConsole } from "./redux/console/consoleActions.js";
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

    const { type, message } = e.data;

    if (!R.isNil(type) && !R.isNil(message)){
      store.dispatch(consoleMessage({ type, message }));
    }
  });


  // send the new code to the sandbox web worker to compile
  // when it changes
  observeStore(store, state => state.code, (newCode) => {
    updateHash(newCode);
    store.dispatch(clearConsole());
    sandbox.postMessage(newCode);
  });

  return sandbox;
}


// update the hash after the user has stopped typing
const updateHash = debounce((newCode) => {

  const file = window.__EXAMPLES__.find(R.compose(
    R.equals(newCode),
    R.prop("code")
  ));

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
