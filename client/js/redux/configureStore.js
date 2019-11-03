import { createStore, applyMiddleware, compose } from "redux";

// create a store with middleware applied
// also attach it to the devToolsExtension
export default function configureStore(
  rootReducer,
  initialState = {},
  middlewares = [],
) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      // https://github.com/zalmoxisus/redux-devtools-extension#1-with-redux
      // check if window is defined so this will also work on the server
      typeof window !== "undefined" && window.devToolsExtension
        ? window.devToolsExtension()
        : x => x,
    ),
  );
}
