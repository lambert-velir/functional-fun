import * as babel from "babel-core";
import { clearConsole } from "./redux/console/consoleActions.js";

export default (store) => (newCode) => {

  // make sure all the window setIntervals and setTimeouts are clear
  clearAllIntervals();
console.log(newCode);
  try {
    store.dispatch(clearConsole());
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
