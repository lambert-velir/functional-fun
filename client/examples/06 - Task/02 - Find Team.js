import R from "ramda";
import heroes from "heroes";
import { findByName, query } from "db";


// Write a function to find the hero's team.
// i.e. all other heroes that have the same alignment
// Returns a comma separated list of names
// heroTeam :: String → [a] → Task String
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
