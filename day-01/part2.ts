import { Execute } from './format';
import { sum } from '@utils/array';

export const execute: Execute = (left, right) => {
  const countRight = new Map<number, number>();

  for (const n of right) {
    countRight.set(n, (countRight.get(n) || 0) + 1);
  }

  return sum(
    left
      .map(n =>
        n * (countRight.get(n) || 0)
      )
  );
}