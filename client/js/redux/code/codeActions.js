// action constants
export const CODE_UPDATE = "CODE/CODE_UPDATE";
export const CODE_PREPEND = "CODE/CODE_PREPEND";

// action creators
export function updateCode(code){
  return {
    type: CODE_UPDATE,
    payload: { code }
  };
}


export function prependCode(code){
  return {
    type: CODE_PREPEND,
    payload: { code }
  };
}
