import observeStore from "./redux/observeStore.js";
import { consoleMessage, clearConsole } from "./redux/console/consoleActions.js";
import pako from "./pako.js";
import R from "ramda";

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


  // send the new code to the web worker
  observeStore(store, state => state.code, (newCode) => {
    window.location.hash = pako.encryptCode(newCode);
    store.dispatch(clearConsole());
    sandbox.postMessage(newCode);
  });

}
