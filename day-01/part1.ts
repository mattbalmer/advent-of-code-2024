import { Execute } from './format';
import { sum } from '@utils/array';

export const execute: Execute = (left, right) => {
  left = left.sort((a, b) => a - b);
  right = right.sort((a, b) => a - b);
  const diffs = left.map((n, i) =>
    Math.abs(right[i] - n)
  );
  return sum(diffs);
}