
export const CLEAR_CONSOLE = "CONSOLE/CLEAR_CONSOLE";
export const CONSOLE_MESSAGE = "CONSOLE/CONSOLE_MESSAGE";
export const CONSOLE_MESSAGES = "CONSOLE/CONSOLE_MESSAGES";


export function clearConsole(){
  return {
    type: CLEAR_CONSOLE,
    payload: { }
  };
}

export function consoleMessage({ type, message }){
  return {
    type: CONSOLE_MESSAGE,
    payload: { type, message }
  };
}

export function consoleMessages(messages){
  return {
    type: CONSOLE_MESSAGES,
    payload: { messages }
  };
}
