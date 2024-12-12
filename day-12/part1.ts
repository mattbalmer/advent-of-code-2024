import { Execute } from './format';
import { Coordinate } from '@utils/grid';
import { generate, sum } from '@utils/array';
import { CoordSet } from '@utils/set';

type Group = {
  area: number,
  perimeter: number,
  nodes: CoordSet,
}

const DIRS: Coordinate[] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getNeighbors = (coord: Coordinate): Coordinate[] => {
  return DIRS.map(dir => [
    coord[0] + dir[0],
    coord[1] + dir[1],
  ]);
}

export const execute: Execute = (lines) => {
  const unexplored = new CoordSet(
    generate(lines.length, y =>
      generate(lines[0].length, x =>
        [x, y] as Coordinate
      )
    ).flat(),
  );
  const groups = new Set<Group>();

  while(unexplored.size > 0) {
    const [x, y] = unexplored.getNext();
    const symbol = lines[y][x];
    unexplored.delete([x, y]);

    const group = {
      area: 1,
      perimeter: 0,
      nodes: new CoordSet([
        [x, y]
      ]),
    };

    const possibleGroupNodes: Coordinate[] = getNeighbors([x, y]);

    while(possibleGroupNodes.length > 0) {
      const [nx, ny] = possibleGroupNodes.shift();
      const neighbor = lines[ny]?.[nx];
      const isInGroup = group.nodes.has([nx, ny]);

      if (isInGroup) {
        continue;
      }

      if (neighbor === symbol) {
        unexplored.delete([nx, ny]);
        group.nodes.add([nx, ny]);
        group.area++;
        possibleGroupNodes.push(
          ...getNeighbors([nx, ny])
        );
      } else {
        group.perimeter++;
      }
    }

    groups.add(group);
  }

  return sum(
    Array.from(groups.values())
      .map(({ area, perimeter }) =>
        area * perimeter
      )
  )
}