const { Left, Right } = require('./structures/Either');
const {multiply} = require('ramda');
/**
 *  compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
const compose = (...fns) => (...args) => 
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

/**
 *  curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
 */
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

/**
 *  add :: a -> b -> a + b
 */
const add = curry((x, y) =>  x + y);

/**
 *  log :: a -> a
 */
const log = curry((name, arg) => { console.log(name, arg); return arg; });

/**
 *  toLowerCase :: String -> String
 */
const toLowerCase = s => s.toLowerCase();

/**
 *  toUpperCase :: String -> String
 */
const toUpperCase = s => s.toUpperCase();

/**
 *  head :: [a] -> a
 */
const head = xs => xs[0];

/**
 *  join :: String -> [String] -> String
 */
const join = curry((str, xs) => xs.join(str));

/**
 *  split :: String -> String -> [String]
 */
const split = curry((sep, xs) => xs.split(sep));

/**
 *  match :: Regex -> String -> [String]
 */
const match = curry((what, s) => s.match(what));

/**
 *  replace :: Regex -> String -> String -> String
 */
const replace = curry((what, replacement, s) => s.replace(what, replacement));

/**
 *  filter :: (a -> Bool) -> [a] -> [a]
 */
const filter = curry((f, xs) => xs.filter(f));

/**
 *  map :: (a -> b) -> [a] -> [b]
 */
const map = curry((f, xs) => xs.map(f));

/**
 *  reduce :: ((b, a) -> b) -> b -> [a] -> b
 */
const reduce = curry((f, x, xs) => xs.reduce(f, x));

/**
 *  flip :: (a -> b -> c) -> b -> a -> c
 */
const flip = curry((fn, a, b) => fn(b, a));

/**
 *  concat :: String -> String -> String
 */
const concat = curry((a, b) => a.concat(b));

/**
 *  append :: String -> String -> String
 */
const append = flip(concat);

/**
 *  id :: a -> a
 */
const id = x => x;

/**
 *  prop :: String -> Object -> a
 */
const prop = curry((p, obj) => obj[p]);

const left = x => new Left(x);

// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
  let result;

  switch (e.constructor) {
    case Left:
      result = f(e.$value);
      break;

    case Right:
      result = g(e.$value);
      break;

    // No Default
  }

  return result;
});

const maybe = curry((v, f, m) => {
  return m.isNothing ? v : f(m.$value);
})

const double = multiply(2);
const doubleArray = map(double);


const imperativeDoubleArray = (arr) => {
  let newArray = [];
  for(let i = 0; i < arr.length; i++) {
    newArray.push(arr[i] * 2);
  }
  return newArray;
}

module.exports = {
  add,
  append,
  concat,
  compose,
  curry,
  either,
  filter,
  head,
  id,
  imperativeDoubleArray,
  join,
  left,
  log,
  map,
  match,
  maybe,
  prop,
  reduce,
  replace,
  split,
  toLowerCase,
  toUpperCase,
};
