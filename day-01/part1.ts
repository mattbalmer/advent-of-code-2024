import { Execute } from './format';
import { sum } from '@utils/array';

export const execute: Execute = (lines) => {
  const [a, b] = lines.reduce<number[][]>(
    ([a, b], [x, y]) => {
      a.push(x);
      b.push(y);
      return [a, b];
    },
    [[], []]
  )
    .map(array => array.sort((a, b) => a - b));
  const diffs = a.map((value, index) => Math.abs(b[index] - value));
  return sum(diffs);
}