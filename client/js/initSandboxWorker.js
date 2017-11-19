import observeStore from "./redux/observeStore.js";
import { consoleLog, consoleError, clearConsole } from "./redux/console/consoleActions.js";
import pako from "./pako.js";


export default function initSandbox(store){

  const sandbox = new Worker("workers/sandbox-generated.js");

  // forward messages to the console
  sandbox.addEventListener("message", e => {

    const { type, message } = e.data;

    switch(type){
      case "log": {
        store.dispatch(consoleLog(message));
        break;
      }

      case "error": {
        store.dispatch(consoleError(message));
        break;
      }

    }
  });


  // send the new code to the web worker
  observeStore(store, state => state.code, (newCode) => {
    window.location.hash = pako.encryptCode(newCode);
    store.dispatch(clearConsole());
    sandbox.postMessage(newCode);
  });

}
