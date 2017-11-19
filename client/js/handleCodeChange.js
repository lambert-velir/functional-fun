import * as babel from "babel-core";
import pako from "./pako.js";
import { clearConsole } from "./redux/console/consoleActions.js";

export default (store) => (newCode) => {

  // make sure all the window setIntervals and setTimeouts are clear
  // clearAllIntervals(); //THIS IS BREAKING CTRL+Z UNDO!!!

  // do this first so the hash updates even if the babel transform fails
  window.location.hash = pako.encryptCode(newCode);

  store.dispatch(clearConsole());

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
  const lastIntervalId = window.setInterval(() => {}, 9999);
  for (let i = 1; i < lastIntervalId; i++){
    window.clearInterval(i);
  }
}
