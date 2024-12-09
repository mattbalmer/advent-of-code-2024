export type XMAS = 'X' | 'M' | 'A' | 'S';
export type Execute = (lines: XMAS[][]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n')
      .filter(line => !!line)
      .map(line => line.split('') as XMAS[])
    ,
  ];
}