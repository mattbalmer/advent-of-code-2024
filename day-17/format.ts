import { PuzzleInput } from './shared';

export type Execute = (lines: PuzzleInput) => string;

export const format = (raw: string): Parameters<Execute> => {
  const lines = raw.split('\n');
  return [
    {
      registers: {
        a: Number((/Register A: (\d+)/).exec(lines[0])[1]),
        b: Number((/Register B: (\d+)/).exec(lines[1])[1]),
        c: Number((/Register C: (\d+)/).exec(lines[2])[1]),
      },
      program: ((/Program: (.+)/).exec(lines[4])[1].split(',').map(Number)),
    },
  ];
}