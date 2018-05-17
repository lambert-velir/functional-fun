import R from "ramda";
import { readFile } from "files";
import Result, { Ok, Error } from "folktale/result";

// tryParse :: String → Result a
const tryParse = s => {
  try {
    return Ok(JSON.parse(s));
  }
  catch(e) {
    return Error(e.toString());
  }
};

// Use readFile (see "docs" dropdown for details) and tryParse to
// write a function that takes a file name and returns the first
// hero's name
// heroes.json contains JSON of the heroes list.
// Your function should be error safe
// getFirstHeroFromFile :: String → String
const getFirstHeroFromFile = R.identity;  // <---- **** EDIT HERE ****

assert.equals(
  getFirstHeroFromFile("heroes.json"),
  Ok("Superman")
);

assert.equals(
  getFirstHeroFromFile("malformed-heroes.json"),
  Error("SyntaxError: Unexpected end of JSON input")
);

assert.equals(
  getFirstHeroFromFile("foo.json"),
  Error("Cannot find file")
);
