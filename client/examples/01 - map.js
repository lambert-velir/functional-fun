/**
 * .map _transforms_ the items in an array into a new array of the same length
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */

const animals = [
  { name: "Hamilton"   , species: "dog"     },
  { name: "Steve"      , species: "fish"    },
  { name: "Fluffykins" , species: "rabbit"  },
  { name: "Sampson"    , species: "rabbit"  },
  { name: "Reebok"     , species: "hamster" },
  { name: "Sassafras"  , species: "dog"     },
  { name: "Laddy"      , species: "dog"     }
];


// this is one (bad) way to transform this array of animals into an array of names
let namesUsingFor = [];
for (let i = 0; i < animals.length; i++){
  namesUsingFor.push(animals[i].name);
}

// use .map instead!
const names = null;



assert.equals(names, namesUsingFor);
