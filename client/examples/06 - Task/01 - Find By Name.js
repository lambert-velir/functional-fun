import R from "ramda";
import heroes from "heroes";
import {findByName} from "db";

// Imagine "heroes" is a database object. You will pass this database object
// into each database read function (findByName, query)

// findByName :: String -> Database -> Task a
// Takes a "name" and the "database". Returns a Task(Hero)
// The task will be rejected if the hero cannot be found

// Write a function to find the alignment of a hero using "findByName"
// heroAlignment :: String -> [a] -> Task String
const heroAlignment = R.identity;

heroAlignment("Superman", heroes)
  .run()
  .listen({
    onResolved: value => { assert.equals("good", value); },
    onRejected: () => { assert.fail("This task should not be rejected"); }
  });

heroAlignment("Bane", heroes)
  .run()
  .listen({
    onResolved: () => { assert.fail("This task should not be resolved"); },
    onRejected: e => { assert.equals("Could not find hero by name", e); }
  });
