import { it } from 'mocha';
import { expect } from 'chai';
import { execute, getData, getTestData } from '@utils/data';
import { format } from './format';
import * as part1 from './part1';
// import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  12
);
const TEST_DATA_2 = getTestData(12, 2);
const TEST_DATA_3 = getTestData(12, 3);

describe(`Day 12`, () => {
  describe('part 1', () => {
    it('should work on test case 1', () => {
      const expected = 140;
      const result = execute(part1, TEST_DATA, format);

      expect(result).to.equal(expected);
    });

    it('should work on test case 2', () => {
      const expected = 772;
      const result = execute(part1, TEST_DATA_2, format);

      expect(result).to.equal(expected);
    });

    it('should work on test case 3', () => {
      const expected = 1930;
      const result = execute(part1, TEST_DATA_3, format);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = execute(part1, DATA, format);

      console.log(result);
    });
  });

  // describe('part 2', () => {
  //   it('should work on test case', () => {
  //     const expected = 0;
  //     const result = execute(part2, TEST_DATA, format);
  //
  //     expect(result).to.equal(expected);
  //   });
  //
  //   // it('should give the real answer', () => {
  //   //   const result = execute(part2, DATA, format);
  //   //
  //   //   console.log(result);
  //   // });
  // });
});