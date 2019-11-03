const R = require("ramda");
const heroes = require("../heroes-db/heroes.js");
const Result = require("folktale/result");

const heroesText = JSON.stringify(heroes);
const malformedHeroesText = heroesText.slice(0, 100);

const files = {
  "heroes.json": heroesText,
  "malformed-heroes.json": malformedHeroesText,
};

module.exports = {
  readFile: name =>
    R.has(name, files)
      ? Result.Ok(files[name])
      : Result.Error("Cannot find file"),
};
