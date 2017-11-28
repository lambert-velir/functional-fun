/**
 * .filter _filters_ the items in an array into a new smaller (or same sized) array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
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


// this is one (bad) way to transform this array of animals into an array of dogs
let dogsUsingFor = [];
for (var i = 0; i < animals.length; i++){
  if (animals[i].species === "dog"){
    dogsUsingFor.push(animals[i]);
  }
}

// use .filter instead!
const dogs = null;



assert.equals(dogs, dogsUsingFor);
