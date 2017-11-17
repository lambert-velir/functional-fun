// action constants
export const CODE_UPDATE = "CODE/CODE_UPDATE";

// action creators
export function updateCode(code){
  return {
    type: CODE_UPDATE,
    payload: { code }
  };
}
