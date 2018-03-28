import R from "ramda";


// R.replace ::
//     (String | RegExp) → (String | Function) → String → String
// R.toUpper :: String → String
// regex to match the first char is /^./
// capitalize :: String → String
const capitalize = R.identity;

assert.equals(
  capitalize("fox"),
  "Fox"
);


// R.split :: (String | RegExp) → String → [String]
// words :: String → [String]
const words = R.identity;

assert.equals(
  words("the quick brown fox jumped over the lazy dog"),
  [ "the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog" ]
);



// R.compose
// capitalizeSentence :: String → String
const capitalizeSentence = R.identity;

assert.equals(
  capitalizeSentence("the quick brown fox jumped over the lazy dog"),
  "The Quick Brown Fox Jumped Over The Lazy Dog"
);
