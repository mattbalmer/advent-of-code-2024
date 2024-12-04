import { Execute } from './format';
import { sum } from '@utils/array';

export const execute: Execute = (left, right) => {
  [left, right].map(list =>
    list.sort((a, b) => a - b)
  );
  const diffs = left.map((n, i) =>
    right[i] - n
  );
  return sum(diffs);
}