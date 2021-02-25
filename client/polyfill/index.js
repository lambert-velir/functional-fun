import "./closest.js";

// window.fetch and window.Promise
import "whatwg-fetch";
import Promise from "promise-polyfill";

if (!window.Promise) {
  window.Promise = Promise;
}
