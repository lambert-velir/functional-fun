const Box = value => ({
  map: fn => Box(fn(value)),
  toString: _ => `Box(${JSON.stringify(value)})`,
  unbox: () => value
});


module.exports = Box;
