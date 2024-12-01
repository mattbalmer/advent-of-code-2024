import { Execute } from './format';
import { sum } from '@utils/array';

export const execute: Execute = (lines) => {
  const left = [];
  const right = new Map<number, number>;

  for (const [a, b] of lines) {
    left.push(a);
    right.set(b, right.has(b) ? right.get(b) + 1 : 1);
  }

  return sum(
    left
      .map(n =>
        n * (right.get(n) || 0)
      )
  );
}