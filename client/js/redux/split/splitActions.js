export const SIZE_CHANGE = "SPLIT/SIZE_CHANGE";


export function sizeChange(size){
  return {
    type: SIZE_CHANGE,
    payload: { size }
  };
}
