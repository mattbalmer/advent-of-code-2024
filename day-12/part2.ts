import { Execute } from './format';
import { Coordinate } from '@utils/grid';
import { generate, sum } from '@utils/array';
import { CoordSet } from '@utils/set';

type Group = {
  nodes: CoordSet,
  x: [min: number, max: number],
  y: [min: number, max: number],
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

const countSides = (group: Group): number => {
  const unexplored = new CoordSet(
    ...group.nodes.values()
  );
  let sides = 0;
  let previous: [min: number, max: number] = null;

  for(let y = group.y[0]; y <= group.y[1]; y++) {
    const nodesInLine = Array.from(group.nodes.values()).filter(([nx, ny]) => ny === y);
    const groupsInLine =

    if (!previous) {
      previous = [
        nodesInLine[0].x,
        nodesInLine[nodesInLine.length - 1].x,
      ];
    }

    for(const [nx, ny] of nodesInLine) {

    }
  }

  return sides;
}

export const execute: Execute = (lines) => {
  const WIDTH = lines[0].length;
  const HEIGHT = lines.length;
  const unexplored = new CoordSet(
    generate(HEIGHT, y =>
      generate(WIDTH, x =>
        [x, y] as Coordinate
      )
    ).flat(),
  );
  const groups = new Set<Group>();

  while(unexplored.size > 0) {
    const [x, y] = unexplored.getNext();
    const symbol = lines[y][x];
    unexplored.delete([x, y]);

    const group: Group = {
      nodes: new CoordSet([
        [x, y]
      ]),
      x: [WIDTH, 0],
      y: [HEIGHT, 0],
    }

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

        group.x[0] = Math.min(group.x[0], nx);
        group.x[1] = Math.max(group.x[1], nx);
        group.y[0] = Math.min(group.y[0], ny);
        group.y[1] = Math.max(group.y[1], ny);

        possibleGroupNodes.push(
          ...getNeighbors([nx, ny])
        );
      }
    }

    groups.add(group);
  }

  console.log('groups', groups);

  return sum(
    Array.from(groups.values())
      .map(group => countSides(group) * group.nodes.size)
  )
}