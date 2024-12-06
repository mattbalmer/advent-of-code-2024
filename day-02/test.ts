import { it } from 'mocha';
import { expect } from 'chai';
import { execute, getData } from '@utils/data';
import { format } from './format';
import * as part1 from './part1';
import * as part2 from './part2';
import * as part2b from './part2b';

const { TEST_DATA, DATA } = getData(
  2
);

describe(`Day 2`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 2;
      const result = execute(part1, TEST_DATA, format);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = execute(part1, DATA, format);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 4;
      const result = execute(part2, TEST_DATA, format);

      expect(result).to.equal(expected);
    });

    it('should give the real answer A', () => {
      const result = execute(part2, DATA, format);

      console.log(result);
    });
    it('should give the real answer B', () => {
      const result = execute(part2b, DATA, format);

      console.log(result);
    });

    // it('should find the mismatches', () => {
    //   const result1 = execute(part2, DATA, format);
    //   const result2 = execute(part2b, DATA, format);
    //
    //   result1.forEach((r, i) => {
    //     if (r !== result2[i]) {
    //       console.log('mismatch at ', i, r, result2[i]);
    //     }
    //   });
    //
    //   console.log(result1.filter(t => t).length, result2.filter(t => t).length);
    // });
  });
});