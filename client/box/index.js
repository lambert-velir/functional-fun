const Box = value => ({
  map: fn => Box(fn(value)),
  toString: _ => `Box(${value.unbox ? value.toString() : JSON.stringify(value)})`,
  unbox: () => value
});


module.exports = Box;
