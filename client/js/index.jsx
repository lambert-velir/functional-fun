import R from "ramda";
import ReactDom from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import App from "./components/App.jsx";

import configureStore from "./redux/configureStore.js";
import rootReducer    from "./redux/rootReducer.js";
import observeStore   from "./redux/observeStore.js";
import handleCodeChange from "./handleCodeChange.js";

import hijackConsole from "./hijackConsole.js";
import { consoleLog, consoleError } from "./redux/console/consoleActions.js";


const store = configureStore(rootReducer, []);

// when the code changes...
observeStore(store, state => state.code, handleCodeChange(store));

// hijack any console calls so we can display them on screen
hijackConsole(
  (log) => store.dispatch(consoleLog(log)),
  (error) => store.dispatch(consoleError(error)),
);

// include R so the code editor can use it.
window.R = R;



ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".js-mount")
);
