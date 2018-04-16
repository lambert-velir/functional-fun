import ReactDom from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import R from "ramda";

import App from "./components/App.jsx";
import pako from "./pako.js";
import initSandbox from "./initSandboxWorker.js";

import CodeMirror from "codemirror";
import attachKeyMap from "./components/CodeEditor/attachKeyMap.js";

import configureStore from "./redux/configureStore.js";
import rootReducer    from "./redux/rootReducer.js";
import { updateCode } from "./redux/code/codeActions.js";
import { setExamples } from "./redux/examples/examplesActions.js";

// expose these so we can mess with them in the console
// and import them in the editor
import Maybe from "folktale/maybe";
import Result from "folktale/result";
import Task from "folktale/concurrency/task";
import heroes from "heroes";

window.Maybe = Maybe;
window.Result = Result;
window.Task = Task;
window.R = R;
window.heroes = heroes;


const store = configureStore(rootReducer, {}, [ thunkMiddleware ]);

// grab the examples from the window and put them in redux
store.dispatch(setExamples(window.__EXAMPLES__ || []));


attachKeyMap(CodeMirror, store);

// attach listeners to the store to run the code in the
// sandbox worker
initSandbox(store);


// on load, check to see if there is something in the hash
loadFromHash();

// update when the user navigates with back/forward buttons
window.addEventListener("popstate", loadFromHash);


ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".js-mount")
);



function loadFromHash(){

  const hash = window.location.hash.replace(/^#/, "");

  const file = R.compose(
    R.find(R.propEq("slug", hash)),
    R.chain(R.prop("examples")), // flat list of examples
  )(window.__EXAMPLES__);


  if (file){
    store.dispatch(updateCode(file.code));
  }
  else if (hash){

    pako.decryptCode(hash)
      .matchWith({
        Ok: ({ value }) => {
          store.dispatch(updateCode(value));
        },
        Error: ({ value }) => {
          history.pushState(null, null, "#");
        }
      });
  }
}
