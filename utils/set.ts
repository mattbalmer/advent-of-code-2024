import { coordFromString, Coordinate, coordToString } from '@utils/grid';

export class CoordSet extends Set {
  constructor(initial: Coordinate[] = []) {
    super(initial);
  }

  add(coord: Coordinate): this {
    return super.add(coordToString(coord));
  }

  has(coord: Coordinate): boolean {
    return super.has(coordToString(coord));
  }

  delete(coord: Coordinate): boolean {
    return super.delete(coordToString(coord));
  }

  getNext(): Coordinate {
    return coordFromString(this.values().next().value);
  }
}