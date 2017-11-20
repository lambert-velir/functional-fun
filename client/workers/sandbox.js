/* eslint-disable no-console */

// make ramda (and anthing from libraries-generated) available
// via import R from "ramda";
self.importScripts("../js/libraries-generated.js");

import getConsoleOutput from "./getConsoleOutput.js";
import * as babel from "babel-core";
import modulePlugin from "babel-plugin-transform-es2015-modules-commonjs";


// hijack any console calls so we can display them on screen
const hijack = (type) => function(){
  const message = getConsoleOutput([].slice.apply(arguments));
  self.postMessage({ type, message });
};

console.log = hijack("log");
console.error = hijack("error");
console.warn = hijack("warn");


// when we get new code, compile and run it
// the hijackConsole above will pick up any console.logs
self.addEventListener("message", e => {

  const newCode = e.data;

  // make sure all the window setIntervals and setTimeouts are clear
  clearAllIntervals();

  try {
    // include module plugin so we can use "import" in the UI
    self.eval(babel.transform(newCode, { plugins: [ modulePlugin ] }).code);
  }
  catch(e){
    console.error(e.message);
  }

});

// catch any random errors on the page (eg. inside a setTimeout)
self.addEventListener("error", e => {
  console.error(e);
});



function clearAllIntervals() {
  // clear any intervals
  // Get a reference to the last interval +1
  const lastIntervalId = setInterval(() => {}, 9999);
  for (let i = 1; i < lastIntervalId; i++){
    clearInterval(i);
  }
}
