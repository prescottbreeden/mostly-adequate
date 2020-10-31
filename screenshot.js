const add = a => b => a + b;

const add2 = add(2);    // function :: (b) => 2 + b;
const add28 = add(28);  // function :: (b) => 28 + b;

const result = add(2)(28);
const failed = add(2, 28); // this does not work
