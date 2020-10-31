const {add, imperativeDoubleArray} = require("../lib/utils");
const {compose} = require("ramda");

describe('true', () => {
  it('is simply always true', () => {
    expect(true).toBe(true);
  });
});

describe('imperativeDoubleArray', () => {
  it('doubles an array', () => {
    expect(imperativeDoubleArray([1, 2, 3])).toStrictEqual([2, 4, 6]);
  });
  
})
