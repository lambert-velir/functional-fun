import R from "ramda";
import { findByName, heroes } from "heroes-db";

// Write a function to find the alignment of a hero
// using "findByName" (see "docs" dropdown for details)
// heroAlignment :: String → [a] → Task String
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
