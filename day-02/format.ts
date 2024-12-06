export type Execute = (lines: number[][]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n')
      .filter(line => !!line)
      .map(line => line.split(' ').map(Number))
  ];
}