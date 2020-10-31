const renderData = compose(
  log('$ '),
  maybe('-', id),
);

const val = Maybe.of(null);
renderData(val);

const cats = [
  { name: 'Bob' },
  { name: 'Frank' },
  { name: 'Sally' },
  { name: 'Sue' },
];

const cats2 = [
  { bad: 'Bob' },
  { bad: 'Frank' },
  { bad: 'Sally' },
  { bad: 'Sue' },
];

const cats3 = [ ];

const isEqual = curry((a, b) => a === b);
const isBob = isEqual('Bob');
const bobs = compose(
  map(isBob),
  map(prop('name')),
);

const API_DATA = Maybe.of(cats);
renderData(API_DATA.map(
  compose(
    map(isEqual(false)),
    bobs)
));
