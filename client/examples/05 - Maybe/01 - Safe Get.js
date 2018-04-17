import R from "ramda";
import heroes from "heroes";
import Maybe, { Just, Nothing} from "folktale/maybe";

// safeGet :: String → Object -> Mabye a
const safeGet = R.Identity;

const superman = heroes[0];

assert.equals(safeGet("vehicle", superman), Nothing);
assert.equals(safeGet("alignment", superman), Just("good"));
