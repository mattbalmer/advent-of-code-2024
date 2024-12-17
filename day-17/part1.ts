import { Execute } from './format';
import { PuzzleState } from './shared';

type Operand = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

enum Instruction {
  adv = 'adv',
  bxl = 'bxl',
  bst = 'bst',
  jnz = 'jnz',
  bxc = 'bxc',
  out = 'out',
  bdv = 'bdv',
  cdv = 'cdv',
}

const InstructionMap = [
  Instruction.adv,
  Instruction.bxl,
  Instruction.bst,
  Instruction.jnz,
  Instruction.bxc,
  Instruction.out,
  Instruction.bdv,
  Instruction.cdv,
]

const ComboOperandMap = [
  0,
  1,
  2,
  3,
  'a',
  'b',
  'c',
  undefined,
];
type ComboOperand = 0 | 1 | 2 | 3 | number;

const comboOperandValue = (state: PuzzleState, operand: Operand): number => {
  const val = ComboOperandMap[operand];
  if (typeof val === 'string') {
    return state[val];
  }
  return val;
}

type LiteralOperandInstructionFn = (state: PuzzleState, operand: Operand) => PuzzleState | number;
type ComboOperandInstructionFn = (state: PuzzleState, operand: ComboOperand) => PuzzleState | number;

const literal = (fn: LiteralOperandInstructionFn): LiteralOperandInstructionFn => {
  return (state, operand) => {
    return fn({
      ...state,
    }, operand);
  };
}

const combo = (fn: ComboOperandInstructionFn): LiteralOperandInstructionFn => {
  return (state, operand) => {
    const comboOp = comboOperandValue(state, operand);
    return fn({
      ...state,
    }, comboOp);
  };
}

const Instructions: Record<
  Instruction,
  LiteralOperandInstructionFn
> = {
  [Instruction.adv]: combo((state, operand) => {
    const numerator = state.a;
    const denominator = 2 ** operand;
    state.a = Math.floor(numerator / denominator);
    console.log('adv', operand, numerator, denominator, state.a);
    return state;
  }),
  [Instruction.bxl]: literal((state, operand) => {
    const input = state.b;
    state.b = input ^ operand;
    console.log('bxl', operand, state.b);
    return state;
  }),
  [Instruction.bst]: combo((state, operand) => {
    state.b = operand % 8;
    console.log('bst', operand, state.b);
    return state;
  }),
  [Instruction.jnz]: literal((state, operand) => {
    if (state.a === 0) {
      console.log('jnz', '--');
      return state;
    }
    console.log('jnz', operand);
    return operand;
  }),
  [Instruction.bxc]: literal((state, operand) => {
    const i = state.b;
    state.b = i ^ state.c;
    console.log('bxc', operand, i, state.c, state.b)
    return state;
  }),
  [Instruction.out]: combo((state, operand) => {
    state.output.push(operand % 8);
    console.log('out', operand, state.output[state.output.length - 1]);
    return state;
  }),
  [Instruction.bdv]: literal((state, operand) => {
    const numerator = state.a;
    const denominator = 2 ** operand;
    state.b = Math.floor(numerator / denominator);
    console.log('bdv', operand, numerator, denominator, state.b);
    return state;
  }),
  [Instruction.cdv]: literal((state, operand) => {
    const numerator = state.a;
    const denominator = 2 ** operand;
    state.c = Math.floor(numerator / denominator);
    console.log('cdv', operand, numerator, denominator, state.c);
    return state;
  }),
}

const run = (state: PuzzleState): PuzzleState => {
  const instructionCode = state.program[state.programIndex];
  const operand = state.program[state.programIndex + 1] as Operand;
  const instruction = InstructionMap[instructionCode];
  const fn = Instructions[instruction];
  console.log('run', instructionCode, instruction, operand, {
    ...state,
  });
  const result = fn(state, operand);
  if (typeof result === 'number') {
    return run({
      ...state,
      programIndex: result,
    });
  } else {
    return {
      ...result,
      programIndex: result.programIndex + 2,
    };
  }
}

export const execute: Execute = (input) => {
  let state: PuzzleState = {
    a: input.registers.a,
    b: input.registers.b,
    c: input.registers.c,
    program: input.program,
    programIndex: 0,
    output: [],
  }
  const max = state.program.length;

  while(state.programIndex < max) {
    state = run(state);
  }

  return state.output.join(',');
}