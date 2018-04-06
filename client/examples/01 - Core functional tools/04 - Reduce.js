/**
 * .map _transforms_ the items in an array into a new array of the same length
 * .filter _filters_ the items in an array into a new smaller (or same sized) array
 * .find returns a _single_ item from an array (or undefined)
 *
 * Use .reduce if there is no other specialized function (like map, filter, find)
 * Reduce is the "multitool" of array transformations
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 */

const dogs = [
  { name: "Hamilton"   , age: 5  },
  { name: "Sassafras"  , age: 12 },
  { name: "Laddy"      , age: 10 }
];


// this is one (bad) way to compute the average age
let avgAge1 = 0;
for(let i = 0; i < dogs.length; i ++){
  let dog = dogs[i];
  avgAge1 += dog.age / dogs.length;
}

// use .reduce instead!
const avgAge2 = null;



assert.equals(avgAge2, avgAge1);
