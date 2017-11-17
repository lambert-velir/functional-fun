
export const CLEAR_CONSOLE = "CONSOLE/CLEAR_CONSOLE";
export const CONSOLE_LOG = "CONSOLE/CONSOLE_LOG";
export const CONSOLE_ERROR = "CONSOLE/CONSOLE_ERROR";


export function clearConsole(){
  return {
    type: CLEAR_CONSOLE,
    payload: { }
  };
}

export function consoleLog(message){
  return {
    type: CONSOLE_LOG,
    payload: { message }
  };
}

export function consoleError(message){
  return {
    type: CONSOLE_ERROR,
    payload: { message }
  };
}
