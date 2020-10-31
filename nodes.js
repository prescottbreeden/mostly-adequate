'use strict'
const { compose, curry, map, reduce } = require('./lib/utils');
const {converge} = require('ramda');

const list1 = [];
const newItems = [1, 2, 3, 4];

const addToBack = reduce((list, val) => [...list, val]);
const addToFront = reduce((list, val) => [val, ...list]);

const test = addToBack(list1, newItems);
const test2 = addToFront(test, ['a', 'b', 'c']);
// const double = x => x * 2;
// const sum = (a, b) => a + b;
// const test = newItems
//   .map(double)
//   .reduce(sum);

console.log(test)
console.log(test2)


const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const flockA = 4;
const flockB = 2;
const flockC = 0;
const result =
  add(
    multiply(
      flockB,
      add(flockA, flockC)
    ),
    multiply(flockA, flockB)
  );

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const flockA = 4;
const flockB = 2;
const flockC = 0;
const result =
  add(
    multiply(flockB, flockA),
    multiply(flockA, flockB)
  );

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const flockA = 4;
const flockB = 2;
const flockC = 0;
const result = converge(add, [
  multiply(flockB, flockA),
  multiply(flockA, flockB),
])();

console.log(result)
