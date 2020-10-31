const {concat} = require("./lib/utils");
const {toString, multiply} = require("ramda");

const addTest = add(2, 2);
expect(addTest).toEqual(4);

const joinTest = join('/', ['bob', 'ross']);
expect(joinTest).toEqual('bob/ross');

const concatTest = concat(' ross', 'bob');
expect(concatTest).toEqual('bob ross');


const getFormattedURL = paths => {
  const merged = [...[ENVIRONMENT.API_URL], ...paths];
  const clean = map(item => {
    return item.endsWith('/') ? item.slice(0, item.length -1) : item;
  }, merged);
  return clean.join('/');
};

const getURL = compose(
  concat(ENVIRONMENT.API_URL),
  join('/'),
);

const getURL = compose(
  concat(ENVIRONMENT.API_URL),
  join('/'),
  map(toString)
);

const getProgram = id => getFormattedURL(['api', 'programs', String(id)]);
getProgram(8);  // {envURL}/api/programs/8


const getProgram = id => getURL(['api', 'programs', id]);
getProgram(8);  // {envURL}/api/programs/8

['api', 'programs', 'district', 42]
['api', 'consortia', 3]
['api', 'voucher', 'voucher-one', 2]

const url = 'api/programs/district/42'

console.log(url);

class Flock {
  constructor(n) {
    this.birds = n;
  }

  add(other) {
    return new Flock(this.birds + other.birds);
  }

  multiply(other) {
    return new Flock(this.birds * other.birds);
  }
}

class Murder extends Flock {
  constructor(n) {
    super(n);
  }
}

class Gaggle extends Flock {
  constructor(n) {
    super(n);
  }
}

const data = {
  crows: new Murder(4),
  geese: new Gaggle(2),
  seagulls: new Flock(6)
}

const query = data.crows
  .add(data.seagulls)
  .multiply(data.geese)
  .add(data.crows.multiply(data.geese))
  .birds;

console.log('query', query);

const geese = {
  flockA: new Flock(4),
  flockB: new Flock(2),
  flockC: new Flock(6),
}

function retrieveGeese(geese) {
  return geese.flockA
    .add(geese.flockC)
    .multiply(geese.flockB)
    .add(new Flock(4).multiply(geese.flockB))
    .birds;
}

function retrieveGeese(geese) {
  return geese.flockB
    .multiply(geese.flockA.add(geese.flockC))
    .add(geese.flockA.multiply(geese.flockB))
    .birds;
}

const res1 = retrieveGeese(geese);
const res2 = retrieveGeese(geese);
const res3 = retrieveGeese(geese);

console.log('res1', res1); // 28
console.log('res2', res2); // 76
console.log('res3', res3); // 172

// const add = (a, b) => a + b;
// const multiply = (a, b) => a * b;


const ducks = {
  flockA: new Flock(4),
  flockB: new Flock(2),
  flockC: new Flock(6),
}
const result = 
  add(
    multiply(ducks.flockB.birds, add(ducks.flockA.birds, ducks.flockC.birds)),
    multiply(ducks.flockA.birds, ducks.flockB.birds)
  );


console.log('ducks result', result);
console.log('ducks', ducks);

const func =
  converge(add, [
    converge(multiply, [
      compose(
        prop('birds'),
        prop('flockB')
      ),
      converge(add, [
        compose(
          prop('birds'),
          prop('flockA')
        ),
        compose(
          prop('birds'),
          prop('flockC')
        ),
      ])
    ]),
    converge(multiply, [
      compose(
        prop('birds'),
        prop('flockA')
      ),
      compose(
        prop('birds'),
        prop('flockB')
      ),
    ])
  ]);

console.log('ducks-2', func(ducks));

const birds = (flock) => compose(
  prop('birds'),
  prop(flock),
);

const pointFreeTransformation =
  converge(add, [
    converge(multiply, [
      birds('flockB'),
      converge(add, [
        birds('flockA'),
        birds('flockC'),
      ])
    ]),
    converge(multiply, [
      birds('flockA'),
      birds('flockB'),
    ])
  ]);

console.log('ducks-3', pointFreeTransformation(ducks));

class Flock {
  constructor(n) {
    this.birds = n;
  }
}

// const geese = {
//   A: new Flock(4),
//   B: new Flock(2),
//   C: new Flock(6),
// }

// function retrieveGeese(geese) {
//   return geese.A
//     .add(geese.C)
//     .multiply(geese.B)
//     .add(new Flock(4).multiply(geese.B))
//     .birds;
// }

// function retrieveGeese(geese) {
//   return geese.B
//     .multiply(geese.A.add(geese.C))
//     .add(geese.A.multiply(geese.B))
//     .birds;
// }

// const res1 = retrieveGeese(geese);
// console.log(res1)


// console.log(subtract(2, 1));
// const sub = converge(subtract, [() => 2, () => 1])();
// console.log(sub);

// const result = 
//   add(
//     multiply(ducks.flockB.birds, add(ducks.flockA.birds, ducks.flockC.birds)),
//     multiply(ducks.flockA.birds, ducks.flockB.birds)
//   );


// console.log('ducks result', result);
// console.log('ducks', ducks);

const countBirds = either(
  prop('birds'),
  () => 0
);

const birdsInFlock = (flock) => compose(
  countBirds,
  prop(flock),
);

// const birdsInFlock = (flock) => compose(
//   prop('birds'),
//   prop(flock),
// );

const retrieveBirds =
  converge(add, [
    converge(multiply, [
      birdsInFlock('flockB'),
      converge(add, [
        birdsInFlock('flockA'),
        birdsInFlock('flockC'),
      ])
    ]),
    converge(multiply, [
      birdsInFlock('flockA'),
      birdsInFlock('flockB'),
    ])
  ]);

// (A + C) * B + (A * B)
// (4 + 6) * 2 + (4 * 2)
// (B * (A + C)) + (A * B)
//

// const retrieveBirds = (data) =>
//   converge(add, [
//     converge(multiply, [
//       birdsInFlock('flockB'),
//       converge(add, [
//         birdsInFlock('flockA'),
//         birdsInFlock('flockC'),
//       ])
//     ]),
//     converge(multiply, [
//       birdsInFlock('flockA'),
//       birdsInFlock('flockB'),
//     ])
//   ])(data);

const retrieveAllBirds = map(retrieveBirds);

const geese = {
  flockA: new Flock(4),
  flockB: new Flock(2),
  flockC: new Flock(6)
}

const ducks = {
  flockA: new Flock(4),
  flockB: new Flock(2),
  flockC: null
}

const ravens = { }

const API_DATA = [
  ducks,
  geese,
  ravens,
];

const allbirds = Maybe.of(API_DATA).map(retrieveAllBirds);

// const allbirds = Maybe.of(null).map(retrieveAllBirds);

allbirds.join().map((x) => {
  console.log(`value is ${x}`);
});

// const retrieveBirds = data =>
//   add(
//     multiply(
//       birdsInFlock('flockB')(data),
//       add(
//         birdsInFlock('flockA')(data),
//         birdsInFlock('flockC')(data)
//       )
//     ),
//     multiply(
//       birdsInFlock('flockA')(data),
//       birdsInFlock('flockB')(data)
//     )
//   );

// console.log(retrieveBirds(ducks));


// add(birdsInFlock('flockA')(data), birdsInFlock('flockC')(data))

// function func1() {}
// function func2() {}

// add(func1, func2);

// add(compose(func1, func2));

// converge(add, [func1, func2]);

// converge(add, [birdsInFlock('flockA'), birdsInFlock('flockC')])


// const add4 = add(4);
// const add2 = add(2);
// const newFunc = compose(add4, add2);
// newFunc(42); // 48

// const newFunc = compose(
//   add(4),
//   add(2)
// );
// newFunc(42); // 48

// const double = multiply(2);
// double(10); // 20

// const doubleArray = map(double);
// doubleArray([1, 2, 3, 4]); // [2, 4, 6, 8]


