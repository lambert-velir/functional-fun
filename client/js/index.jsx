import ReactDom from "react-dom";
import React from "react";
import { Provider } from "react-redux";

import App from "./components/App.jsx";
import pako from "./pako.js";
import initSandbox from "./initSandboxWorker.js";

import configureStore from "./redux/configureStore.js";
import rootReducer    from "./redux/rootReducer.js";
import { updateCode } from "./redux/code/codeActions.js";



const store = configureStore(rootReducer, []);

// attach listeners to the store to run the code in the
// sandbox worker
initSandbox(store);


ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".js-mount")
);


// on load, check to see if there is something in the hash
const hash = window.location.hash.replace(/^#/, "");

if (hash){
  const code = pako.decryptCode(hash);
  store.dispatch(updateCode(code));
}
