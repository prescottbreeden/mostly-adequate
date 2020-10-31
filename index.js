const {reduce, concat, curry, compose, id, log, maybe, left} = require("./lib/utils");
const Container = require("./lib/Container");
const Maybe = require("./lib/structures/Maybe");
const { Either } = require("./lib/structures/Either");
const {map, add, multiply, converge, prop, either, subtract, isNil, join } = require("ramda");

console.log('================================')
console.log('           Run Code')
console.log('================================')

const returnNull = () => null;

const double = multiply(2);

const gimmeEither = compose(
  log('result'),
  either(Maybe.of, () => 'or'),
  () => 4,
);

gimmeEither();
