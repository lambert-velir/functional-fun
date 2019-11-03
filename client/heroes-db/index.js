const R = require("ramda");
const Task = require("folktale/concurrency/task");
const heroes = require("./heroes.js");
const delay = 500;

// resolveLater :: a => Task a
const resolveLater = val =>
  Task.task(resolver => {
    setTimeout(() => {
      resolver.resolve(val);
    }, delay);
  });

// rejectLater :: a => Task a
const rejectLater = error =>
  Task.task(resolver => {
    setTimeout(() => {
      resolver.reject(error);
    }, delay);
  });

// fromNullable :: (* -> a) -> String -> (* -> Task a)
const fromNullable = R.curry((fn, failureReason) =>
  R.curryN(
    fn.length,
    R.compose(
      result =>
        R.isNil(result) ? rejectLater(failureReason) : resolveLater(result),
      fn,
    ),
  ),
);

const DB = {
  query: predicate => resolveLater(heroes.filter(predicate)),

  findByName: fromNullable(
    name => R.find(R.propEq("name", name), heroes),
    "Could not find hero by name",
  ),

  findAll: fromNullable(() => heroes, "Could not get all"),

  heroes,
};

module.exports = R.merge(DB, {
  toString: () =>
    JSON.stringify(
      {
        query: "(a → bool) → Database → Task [a]",
        findByName: "String → Database → Task a",
        findAll: "() → Task [Hero]",
        heroes,
      },
      null,
      2,
    ),
});
