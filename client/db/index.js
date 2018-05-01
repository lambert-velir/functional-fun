const R = require("ramda");
const Task = require("folktale/concurrency/task");

const delay = 500;

// resolveLater :: a => Task a
const resolveLater = val => Task.task(resolver => {
  setTimeout(() => {
    resolver.resolve(val);
  }, delay);
});

// rejectLater :: a => Task a
const rejectLater = error => Task.task(resolver => {
  setTimeout(() => {
    resolver.reject(error);
  }, delay);
});

// fromNullable :: (* -> a) -> String -> (* -> Task a)
const fromNullable = R.curry((fn, failureReason) => R.curryN(
    fn.length,
    R.compose(
      result => R.isNil(result) ?
        rejectLater(failureReason) :
        resolveLater(result),
      fn)));

module.exports = {
  query: (predicate, heroes) => resolveLater(heroes.filter(predicate)),

  findByName: fromNullable(
    (name, heroes) => R.find(R.propEq("name", name), heroes),
    "Could not find hero by name"),

  findAll: fromNullable(
    R.identity,
    "Could not get all")
};
