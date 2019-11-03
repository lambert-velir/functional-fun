export const SIZE_CHANGE = "SPLIT/SIZE_CHANGE";

export function setSize(size) {
  return {
    type: SIZE_CHANGE,
    payload: { size },
  };
}
