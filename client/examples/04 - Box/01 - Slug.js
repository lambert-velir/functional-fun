import R from "ramda";
import Box from "box";


// toSlug :: String → String
const toSlug = s => Box(s)


assert.equals(toSlug("Functional fun"), "functional-fun");
