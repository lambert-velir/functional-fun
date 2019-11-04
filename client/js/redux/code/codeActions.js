import { clearConsole } from "../console/consoleActions.js";

// action constants
export const CODE_UPDATE = "CODE/CODE_UPDATE";
export const CODE_PREPEND = "CODE/CODE_PREPEND";
export const CODE_RELOAD = "CODE/CODE_RELOAD";
export const CODE_FORMAT = "CODE/CODE_FORMAT";

// action creators
export function updateCode(code) {
  return {
    type: CODE_UPDATE,
    payload: { code },
  };
}

export function prependCode(code) {
  return {
    type: CODE_PREPEND,
    payload: { code },
  };
}

export function formatCode() {
  return {
    type: CODE_FORMAT,
  };
}

export function rerunCode() {
  return (dispatch, getState) => {
    const { code } = getState();

    dispatch(clearConsole());

    // HACK clear the code so the observeStore in initSandboxWorker will run the code again
    // is there a better way to do this?
    // runCode is not part of redux...
    dispatch(updateCode(""));

    setTimeout(() => {
      // HACK if the user clicks the button again before 250ms, it will clear the code
      // prevent that from happening!
      if (code !== "") {
        dispatch(updateCode(code));
      }
    }, 250);
  };
}
