import R from "ramda";
import Box from "box";
import { heroes } from "heroes-db";

// Use Box to write a function that takes a Hero and turns the hero's name into
//  a "slug". i.e. lowercases and replaces whitespace with dashes.
// heroToSlug :: Hero → String
const heroToSlug = (hero) => Box(hero); // <---- **** EDIT HERE ****

assert.equals(heroToSlug(heroes[3]), "two-face");
assert.equals(heroToSlug(heroes[6]), "red-robin");
