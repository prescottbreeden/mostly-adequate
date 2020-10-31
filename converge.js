const {concat, curry, compose, id, map, prop, log, add, maybe, left} = require("./lib/utils");
const Container = require("./lib/Container");
const Maybe = require("./lib/structures/Maybe");
const { Either } = require("./lib/structures/Either");
const {either, reduce } = require("ramda");

const date = new Date(Date.now());
// const date = null;
Object.prototype.toString.call(date) === '[object Date]'
  ? Either.of(date).map(d => d.toDateString())
  : left('invalid');

const gt10 = x => x > 10;
const f = either(gt10, (val) => `${val} is invalid`);
console.log(f(101));
f(8);
f(5);

const cats = [
  { name: 'Bob', lastName: 'Ross' },
  { name: 'Frank', lastName: 'Langella' },
];

const isEqual = curry((a, b) => a === b);

// this bugs me
const fullName = cat => add(
  prop('name', cat),
  prop('lastName', cat)
);

const converge = (fn, wraps) => arg => fn(...wraps.map(wrap => wrap(arg)));

const fName = converge(add, [prop('dingo'), prop('lastName')])
const r = fName(cats[0])
if (r.includes('undefined')) {
  console.log('---')
} else {
  console.log(r)
}


const combinator = compose(compose);
const catsThatAreBobRoss = combinator(
  map(isEqual('BobRoss')),
  map(fullName),
);

console.log(catsThatAreBobRoss(cats));

const isBobRoss = compose(isEqual('BobRoss'), fName);
const abstraction = map(isBobRoss);

console.log(abstraction(cats));
