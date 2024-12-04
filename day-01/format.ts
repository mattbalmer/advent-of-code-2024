export type Execute = (left: number[], right: number[]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return raw.split('\n').reduce(([left, right], line) => {
    if (line) {
      const [, l, r] = (/(\d+)\s+(\d+)/g)
        .exec(line)
        .map(Number);
      left.push(l);
      right.push(r);
    }
    return [left, right];
  }, [
    [],
    [],
  ])
}