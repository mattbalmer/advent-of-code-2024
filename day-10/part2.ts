import { Execute } from './format';
import { Coordinate } from '@utils/grid';
import { sum } from '@utils/array';

const DIRS: Coordinate[] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getTrailheads = (lines: number[][]): Coordinate[] => {
  const trailheads: Coordinate[] = [];
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === 0) {
        trailheads.push([x, y]);
      }
    }
  }
  return trailheads;
}

const getValidNeighbors = ([x, y]: Coordinate, lines: number[][]): Coordinate[] => {
  const value = lines[y][x];
  return DIRS.reduce<Coordinate[]>((neighbors, [dx, dy]) => {
    const [nx, ny] = [x + dx, y + dy];
    if (nx < 0 || nx >= lines[0].length || ny < 0 || ny >= lines.length) {
      return neighbors;
    }
    const nv = lines[ny][nx];
    if (nv === value + 1) {
      neighbors.push([nx, ny]);
    }
    return neighbors;
  }, [])
}

const getTrailheadScore = (trailhead: Coordinate, lines: number[][]): number => {
  let paths = [
    [trailhead],
  ];
  let validPaths = [];

  while(paths.length > 0) {
    const [[x, y], ...path] = paths.shift();
    const value = lines[y][x];
    if (value === 9) {
      validPaths.push([
        [x, y],
        ...path,
      ]);
    } else {
      const neighbors = getValidNeighbors([x, y], lines);
      neighbors.forEach(neighbor => {
        paths.unshift([
          neighbor,
          [x, y],
          ...path,
        ])
      });
    }
  }

  return validPaths.length;
}

export const execute: Execute = (lines) => {
  const trailheads = getTrailheads(lines);

  return sum(
    trailheads.map(trailhead =>
      getTrailheadScore(trailhead, lines)
    )
  )
}