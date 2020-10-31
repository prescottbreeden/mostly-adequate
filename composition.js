const cats = [
  { name: 'Bob', lastName: 'Ross' },
  { name: 'Frank', lastName: 'Ross' },
  { name: 'Sally', lastName: 'Ross' },
  { name: 'Sue', lastName: 'Ross' },
];

const isEqual = curry((a, b) => a === b);
const isBob = isEqual('Bob');
const bobs = compose(map(isBob), map(prop('name')));

const bobross = compose(map(prop('lastName')), map(prop('name')));
console.log(bobross(cats));

const isBob2 = compose(
  isBob,
  prop('name')
);
const bobs2 = map(isBob2);

// console.log(bobs(cats));
// console.log(bobs2(cats));
