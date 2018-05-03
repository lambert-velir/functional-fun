import R from "ramda";
import { readFile } from "files";
import Result, { Ok, Error } from "folktale/result";

// tryParse :: String => Result a
const tryParse = s => {
    try { return Ok(JSON.parse(s));}
    catch(e) { return Error(e.toString());}
}

// Write a function that takes a file name and returns the first hero's name
// The file contains JSON of the heroes list. Your function should be error safe
const getFirstHeroFromFile = R.identity;

assert.equals(getFirstHeroFromFile("heroes.json"), Ok("Superman"));

assert.equals(
  getFirstHeroFromFile("malformed-heroes.json"),
  Error("SyntaxError: Unexpected end of JSON input"));

assert.equals(
  getFirstHeroFromFile("foo.json"),
  Error("Cannot find file"));
