import { Execute } from './format';
import { sum } from '@utils/array';
import * as console from 'node:console';

const nextInstruction = (str: string, i: number = 0) => {
  return (/(mul\(\d+,\d+\))|do\(\)|don't\(\)/g).exec(str.substring(i));
}

export const execute: Execute = (lines) => {
  return sum(
    lines.map((line) => {
      let i = 0;
      let e = nextInstruction(line);
      let doMult = true;
      let total = 0;

      while(e && i < line.length) {
        const instruction = e[0];
        console.log(i, e);
        i += e.index + instruction.length;
        if (instruction === `do()`) {
          doMult = true;
        }
        if (instruction === `don't()`) {
          doMult = false;
        }
        if (doMult && instruction.startsWith('mul')) {
          const [, a, b] = (/mul\((\d+),(\d+)\)/g).exec(instruction).map(Number);
          total += a * b;
        }
        e = nextInstruction(line, i);
      }

      return total;
    })
  )
}