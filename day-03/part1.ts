import { Execute } from './format';
import { sum } from '@utils/array';

export const execute: Execute = (lines) => {
  return sum(
    lines.map((line) => {
      const matches = line.match(/(mul\(\d+,\d+\))/g);
      if (!matches) {
        return 0;
      }
      return sum(
        line.match(/(mul\(\d+,\d+\))/g).map((match) => {
          const [, a, b] = (/mul\((\d+),(\d+)\)/g).exec(match).map(Number);
          return a * b;
        })
      )
    })
  )
}