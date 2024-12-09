import { Execute, XMAS } from './format';
import { Coordinate } from '@utils/grid';

const DIRS: Coordinate[] = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];

const VALS = {
  'M': -1,
  'S': 1,
};

const charAt = (coord: Coordinate, grid: XMAS[][], dir: Coordinate): string => {
  const [x, y] = [
    coord[0] + dir[0],
    coord[1] + dir[1]
  ];
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
    return '';
  }
  return grid[y][x];
}

export const execute: Execute = (lines) => {
  const aCoords: Coordinate[] = [];

  for(let y = 0; y < lines.length; y++) {
    for(let x = 0; x < lines[y].length; x++) {
      if(lines[y][x] === 'A') {
        aCoords.push([x, y]);
      }
    }
  }

  const explorations = aCoords
    .map(coord => {
      const chars = DIRS.map(dir =>
        charAt(coord, lines, dir)
      );
      const lineOneValue = VALS[chars[0]] + VALS[chars[2]];
      const lineTwoValue = VALS[chars[1]] + VALS[chars[3]];
      return lineOneValue === 0 && lineTwoValue === 0;
    });

  return explorations.filter(Boolean).length;
}