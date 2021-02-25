import R from "ramda";
import { findByName } from "heroes-db";

// Write a function to find the alignment of a hero
// using "findByName" (see "docs" dropdown for details)
// heroAlignment :: String → Task String
const heroAlignment = R.identity; // <---- **** EDIT HERE ****

heroAlignment("Superman")
  .run()
  .listen({
    onResolved: (value) => assert.equals(value, "good"),
    onRejected: () => assert.fail("This task should not be rejected"),
  });

heroAlignment("Bane")
  .run()
  .listen({
    onResolved: () => assert.fail("This task should not be resolved"),
    onRejected: (e) => assert.equals(e, "Could not find hero by name"),
  });
