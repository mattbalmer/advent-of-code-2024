export type Execute = (lines: [number, number][]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n')
      .filter(line => !!line)
      .map(line =>
        line.replace(/(\s+)/g, ' ').split(' ').map(Number) as [number, number]
      ),
  ];
}