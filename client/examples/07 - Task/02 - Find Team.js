import R from "ramda";
import { findByName, query } from "heroes-db";

// Write a function to find the hero's team.
// i.e. all other heroes that have the same alignment
// Returns a comma separated list of names
// heroTeam :: String → Task String
const heroTeam = R.identity;  // <---- **** EDIT HERE ****

heroTeam("Superman")
  .run()
  .listen({
    onResolved: value =>
      assert.equals(
        value,
        "Superman, Batman, Nightwing, Red Robin, Robin I, Catwoman, Batgirl VI, Oracle (DC), Huntress"
      ),
    onRejected: () =>
      assert.fail("This task should not be rejected")
  });

heroTeam("Bane")
  .run()
  .listen({
    onResolved: () =>
      assert.fail("This task should not be resolved"),
    onRejected: e =>
      assert.equals(e, "Could not find hero by name")
  });
