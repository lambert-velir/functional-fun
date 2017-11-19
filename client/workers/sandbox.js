import hijackConsole from "./hijackConsole.js";
import * as babel from "babel-core";

// hijack any console calls so we can display them on screen
hijackConsole(
  (message) => postMessage({ type: "log", message }),
  (message) => postMessage({ type: "error", message })
);

// when we get new code, compile and run it
// the hijackConsole above will pick up any console.logs
self.onmessage = function(e){

  const newCode = e.data;

  // make sure all the window setIntervals and setTimeouts are clear
  clearAllIntervals();

  try {
    eval(babel.transform(newCode).code);
  }
  catch(e){
    console.error(e.message);
  }

};


function clearAllIntervals() {
  // clear any intervals
  // Get a reference to the last interval +1
  const lastIntervalId = setInterval(() => {}, 9999);
  for (let i = 1; i < lastIntervalId; i++){
    clearInterval(i);
  }
}
