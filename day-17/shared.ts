export type PuzzleInput = {
  registers: {
    a: number,
    b: number,
    c: number,
  }
  program: number[],
}

export type PuzzleState = {
  a: number,
  b: number,
  c: number,
  program: number[],
  programIndex: number,
  output: number[],
}