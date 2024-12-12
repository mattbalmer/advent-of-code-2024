import { Execute } from './format';
import { Coordinate } from '@utils/grid';
import { sum } from '@utils/array';

const DIRS: Coordinate[] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export const execute: Execute = (lines) => {
  const groups = new Map<string, {
    area: number,
    perimeter: number,
  }>();

  for(let y = 0; y < lines.length; y++) {
    for(let x = 0; x < lines[y].length; x++) {
      const symbol = lines[y][x];
      console.log(`[${x}, ${y}] = ${symbol}`);
      const group = groups.get(symbol) || { area: 0, perimeter: 0 };
      group.area++;
      for(const dir of DIRS) {
        const neighbor = lines[y + dir[1]]?.[x + dir[0]];
        if (neighbor !== symbol) {
          group.perimeter++;
        }
      }

      groups.set(symbol, group);
    }
  }

  console.log(groups.values());

  return sum(
    Array.from(groups.values())
      .map(({ area, perimeter }) =>
        area * perimeter
      )
  )
}