import { Execute, XMAS } from './format';
import { Coordinate } from '@utils/grid';

const PATH = 'XMAS';

const DIRS: Coordinate[] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

const explore = ([x, y]: Coordinate, grid: XMAS[][], dir: Coordinate, path: string = ''): boolean => {
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
    return false;
  }

  const c = grid[y][x];
  path += c;
  if (!PATH.startsWith(path)) {
    return false;
  }
  if (PATH === path) {
    return true;
  }
  return explore([x + dir[0], y + dir[1]], grid, dir, path);
}

export const execute: Execute = (lines) => {
  const xCoords: Coordinate[] = [];

  for(let y = 0; y < lines.length; y++) {
    for(let x = 0; x < lines[y].length; x++) {
      if(lines[y][x] === 'X') {
        xCoords.push([x, y]);
      }
    }
  }

  const explorations = xCoords
    .map(coord =>
      DIRS.map(dir =>
        explore(coord, lines, dir)
      )
    );

  return explorations.flat().filter(Boolean).length;
}