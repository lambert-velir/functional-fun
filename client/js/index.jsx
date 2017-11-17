import ReactDom from "react-dom";
import React from "react";
import { Provider } from "react-redux";

import configureStore from "./redux/configureStore.js";
import rootReducer    from "./redux/rootReducer.js";

import App from "./components/App.jsx";


const store = configureStore(rootReducer, []);



ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".js-mount")
);
