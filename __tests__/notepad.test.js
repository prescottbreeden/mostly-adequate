const { rubFB, includes, divisibleBy, runFB, } = require('../algoPractice');

describe('fizzBuzz logic', () => {

  describe('divisibleBy', () => {
    const divisibleBy2 = divisibleBy(2);

    test('returns true for 4 divisibleBy 2', () => {
      expect(divisibleBy2(4)).toBe(true);
    });

    test('returns false for 4 divisibleBy 2', () => {
      expect(divisibleBy2(5)).toBe(false);
    });

  });

  describe('includes', () => {
    test('returns true when number is in list', () => {
      const list1 = [1, 2, 3, 4, 5, 6];
      const includesList1 = includes(list1);
      expect(includesList1(0)).toBe(false);
      expect(includesList1(1)).toBe(true);
      expect(includesList1(3)).toBe(true);
      expect(includesList1(6)).toBe(true);
      expect(includesList1(7)).toBe(false);
    });

  });

  describe('fizzBuzz', () => {
    test('returns n items', () => {
      const n = 10;
      const result = runFB(n);
      expect(result.length).toBe(n);
    });

  });

});
