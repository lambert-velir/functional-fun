const Box = value => ({
  map: fn => Box(fn(value)),
  unbox: () => value
});


module.exports = Box;
