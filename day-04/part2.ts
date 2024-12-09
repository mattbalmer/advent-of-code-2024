import { Execute, XMAS } from './format';
import { Coordinate } from '@utils/grid';

const DIRS: Coordinate[] = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];

const charAt = (coord: Coordinate, grid: XMAS[][], dir: Coordinate): string => {
  const [x, y] = [coord[0] + dir[0], coord[1] + dir[1]];
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

  // todo: convert to numbers then add the line, simpler.
  const explorations = aCoords
    .map(coord => {
      const chars = DIRS.map(dir =>
        charAt(coord, lines, dir)
      );
      const isLineAOK = (chars[0] === 'M' && chars[2] === 'S') || (chars[0] === 'S' && chars[2] === 'M');
      const isLineBOK = (chars[1] === 'M' && chars[3] === 'S') || (chars[1] === 'S' && chars[3] === 'M');
      return isLineAOK && isLineBOK;
    });

  return explorations.flat().filter(Boolean).length;
}