const { compose, curry, log } = require('./lib/utils');

// -------------------------------------
// func solution
// -------------------------------------

/**  
  * divisibleBy :: number -> number -> bool
  */
const divisibleBy = curry((by, number) => number % by === 0);

/**
 * Curried function that evaluates if a number is contained in an array.
 * @param {Array} arr Array of type a
 * @param {object} x A value of type a to check if is included in arr
 * @returns {boolean} True if x is included in arr, else false
 * @signature includes :: [a] -> a -> bool
 */
const includes = curry((arr, x) => arr.indexOf(x) >= 0);

/**
 * When num is divisible by fizz, it returns 'Fizz'.
 * When num is divisible by buzz, it returns 'Buzz'.
 * When num is divisible by fizz or buzz, or is included in the exceptions list,
 * it returns 'Fizz Buzz'.
 * Otherwise it returns the stringified number.
 * @param {number} num The number to be evaluated
 * @param {number[]} exceptions List of numbers to forace evaluate as Fizz Buzz
 * @param {number=} fizz The number to test if num is divisible by fizz
 * @param {number=} buzz The number to test if num is divisible by buzz
 * @returns {string} 'Fizz', 'Buzz', 'Fizz Buzz' or num
 */
const fizzBuzz = (num, exceptions = [], fizz = 3, buzz = 5) => {
  const divisibleByFizz = divisibleBy(fizz);
  const divisibleByBuzz = divisibleBy(buzz);
  const isException = includes(exceptions);
  const isFizzBuzz = num => {
    return isException(num) || (divisibleByFizz(num) && divisibleByBuzz(num));
  };

  return num === 0 ? null
    : isFizzBuzz( num) ? 'Fizz buzz!'
    : divisibleByFizz(num) ? 'Fizz'
    : divisibleByBuzz(num) ? 'Buzz'
    : num.toString();
};

/**
 * Generates an array of fizz buzz results.
 * @param {number} length - number of results to create
 * @param {number[]} exceptions - numbers to force calculate as 'Fizz Buzz'
 * @returns {string[]} an array of Fizz Buzz results
 */
const runFB = (length, exceptions = [], fizz = 3, buzz = 5) => {
  let i = 0;
  const arr = [];
  do { arr.push(fizzBuzz(++i, exceptions, fizz, buzz)) } while (i < length);
  return arr;
}

const solution = runFB(19, [1, 4, 8], 2, 5);
console.log(solution);

module.exports = {
  includes,
  divisibleBy,
  runFB
};
