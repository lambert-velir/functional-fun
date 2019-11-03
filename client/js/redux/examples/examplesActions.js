// action constants
export const INIT_EXAMPLES = "EXAMPLES/INIT";
export const SELECT_EXAMPLE = "EXAMPLES/SELECT";

// action creators
export function setExamples(examples) {
  return {
    type: INIT_EXAMPLES,
    payload: { examples },
  };
}

export function selectExample(slug) {
  return {
    type: SELECT_EXAMPLE,
    payload: { slug },
  };
}
