/**
 * .find returns a _single_ item from an array (or undefined)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
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


// this is one (bad) way to find sassy
let sassy1;
for (var i = 0; i < animals.length; i++){
  if (animals[i].name === "Sassafras"){
    sassy1 = animals[i];
    break;
  }
}

// use .find instead!
const sassy2 = null;  // <---- **** EDIT HERE ****



assert.equals(sassy2, sassy1);
