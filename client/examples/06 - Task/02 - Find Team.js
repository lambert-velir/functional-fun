import R from "ramda";
import heroes from "heroes";
import {findByName, query} from "db";

// Imagine "heroes" is a database object. You will pass this database object
// into each database read function (findByName, query)

// findByName :: String -> Database -> Task a
// Takes a "name" and the "database". Returns a Task(Hero)
// The task will be rejected if the hero cannot be found

// query :: (a -> bool) -> Database -> Task [a]
// Takes a predicate function and the "database". Returns a Task([Hero])
// All heroes that match the predicate will be returned
// If no heroes match, expect an empty list

// Write a function to find the hero's team. i.e. all other heroes that have the same alignment
// Returns a comma separated list of names
// heroTeam :: String -> [a] -> Task String
const heroTeam = R.identity;

heroTeam("Superman", heroes)
  .run()
  .listen({
    onResolved: value => {
      assert.equals("Superman, Batman, Nightwing, Red Robin, Robin I, Catwoman, Batgirl VI, Oracle (DC), Huntress", value);
    },
    onRejected: () => { assert.fail("This task should not be rejected"); }
  });

heroTeam("Bane", heroes)
  .run()
  .listen({
    onResolved: () => { assert.fail("This task should not be resolved"); },
    onRejected: e => { assert.equals("Could not find hero by name", e); }
  });
