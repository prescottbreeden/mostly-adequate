const moment = require('moment');
const Container = require('./lib/Container');
const Maybe = require('./lib/structures/Maybe');
const { Either, Left, Right } = require('./lib/structures/Either');
const {
  add,
  append,
  concat,
  compose,
  curry,
  filter,
  head,
  id,
  join,
  log,
  map,
  match,
  prop,
  reduce,
  replace,
  split,
  toLowerCase,
  toUpperCase,
} = require('./lib/utils');
const {indexOf} = require('ramda');

// -----------------------------------------
const add42 = add(42);

// console.log(add42(42));

const Bind = curry((nextFn, optionInput) => {
  return optionInput === null ?
    optionInput :
    nextFn(optionInput);
});

const Add42 = Bind(add42);
const Add33 = Bind(add(33));
const AddTheThings = compose(Add42, Add33);

const taskExample = (num) => AddTheThings(num);
// console.log(taskExample(10));


const hasLetterR = match(/r/g);
// console.log(hasLetterR('hello world'));
// console.log(hasLetterR('just j and s and t etc'));
// console.log(filter(hasLetterR, ['rock and roll', 'smooth jazz']));

const removeStringsWithoutRs = filter(hasLetterR);
// console.log(removeStringsWithoutRs(['rock and roll', 'smooth jazz', 'drum circle']));

const replaceVowels = replace(/[aeiou]/ig);
const censored = replaceVowels('*');
// console.log(censored('White Chocolate Rain'));

const rick = replace('White');
const roll = rick('Rick');
// console.log(roll('White Chocolate Rain'));


// ------------------------
//      Point Free
// ------------------------

// not point free cause it mentions the data: "word"
const nSnakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');

const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
// console.log(snakeCase('dingoes ate my semicolons'));

const nInitials = name => 
  name
    .split(' ')
    .map(compose(toUpperCase, head))
    .join('. ');

const initials = compose(
  join('. '),
  map(compose(toUpperCase, head)),
  split(' ')
);

// console.log(initials('hunter stockton thompson'));

// ------------------------
//      Category Theory
// ------------------------

// compose(id, f) === compose(f, id) === f;
// compose(map(f), map(g)) === map(compose(f, g));

// ------------------------
//      Hindley-Milner
// ------------------------

/**
 *  tail :: [a] -> [a]
 */
const tail = s => s.slice(1);

/**
 *  capitalize :: String -> String
 */
const capitalize = s => add(toUpperCase(head(s)), toLowerCase(tail(s)));
// console.log(capitalize('dingo'));

/**
 *  capitalizeSentence :: String -> String
 */
const capitalizeSentence = compose(
  join(' '),
  map(capitalize),
  split(' ')
);
// console.log(capitalizeSentence('rubber baby buggy bumpers'));

/**
 *  onHoliday :: String -> [String]
 */
const onHoliday = match(/holiday/g);


// ------------------------
//      Containers
// ------------------------

Container.of(3);
Container.of('hotdogs');
Container.of({ name: 'yoda' });

Container.of(2).map(two => two + 2)

Container.of('flamethrowers')
  .map(toUpperCase)

Container.of('bombs')
  .map(append(' away'))
  .map(prop('length'))

Maybe.of('Malkovich Malkovich').map(match(/a/ig));
Maybe.of(null).map(match(/a/ig));

Maybe.of({ name: 'Boris' })
  .map(prop('age'))
  .map(add(10))

Maybe.of({ name: 'Dinah', age: 22 })
  .map(prop('age'))
  .map(add(10))

// pointfree Maybe

const data = Maybe.of([
  {name: 'Bob', age: 4},
  {name: 'Dinah', age: 22}
]);

const getAges = map(prop('age'));
const displayAges = compose(log, getAges);
map(displayAges, data);

// more examples

/**
 *  withdrawMoney :: Number -> Account -> Maybe(Account)
 */
const withdrawMoney = curry((amount, { balance }) => {
  return Maybe.of(balance >= amount ? { balance: balance - amount } : null);
});

/**
 *  updateLedger :: Account -> Account
 */
const updateLedger = account => account;

/**
 *  remainingBalance :: Account -> String
 */
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

/**
 *  finishTransaction :: Account -> Maybe(String)
 */
const finishTransaction = compose(remainingBalance, updateLedger);


/**
 *  getTwenty :: Account -> Maybe(String)
 */
const getTwenty = compose(map(finishTransaction), withdrawMoney(20));

getTwenty({ balance: 200.00 });
getTwenty({ balance: 10.00 });


// ------------------------
//      Either Left Right
// ------------------------

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


const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');
  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birthdate could not be parsed');
});

getAge(moment(), { birthDate: '2005-12-12' });
getAge(moment(), { birthDate: 'July 4, 2001' });

// toString :: a -> String
const toString = String;

// fortune :: Number -> String
const fortune = compose(add('If you survive, you will be '), toString, add(1));

// zoltar :: User -> Either(String, _)
const zoltar = compose(
  log,
  either(id, fortune),
  getAge(moment())
);

zoltar({ birthDate: '2005-12-12' });
// 'If you survive, you will be 10'
// Right(undefined)

zoltar({ birthDate: 'balloons!' });
// Left('Birthdate could not be parsed')

