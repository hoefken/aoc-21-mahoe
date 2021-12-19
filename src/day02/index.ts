import run from "aocrunner";
import { Direction, Instruction, parseDirection } from "../utils/direction.js";

const parseInput = (rawInput: string): Instruction[] => {
  const list = rawInput.split('\n');
  return list.map((elem: any) => {
    const instruction = elem.split(' ');
    return { direction: parseDirection(instruction[0]), distance: instruction[1] - 0 };
  });
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let x = 0;
  let depth = 0;
  input.forEach((instruction) => {
    if (instruction.direction == Direction.UP) {
      depth -= instruction.distance;
    } else if (instruction.direction == Direction.DOWN) {
      depth += instruction.distance;
    } else if (instruction.direction == Direction.FORWARD) {
      x += instruction.distance;
    }
  })
  console.info(`1: Submarine x-distance: ${x} with a depth of ${depth}`);

  return x * depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let x = 0;
  let depth = 0;
  let aim = 0;
  input.forEach((instruction) => {
    if (instruction.direction == Direction.UP) {
      aim -= instruction.distance;
    } else if (instruction.direction == Direction.DOWN) {
      aim += instruction.distance;
    } else if (instruction.direction == Direction.FORWARD) {
      x += instruction.distance;
      depth += aim * instruction.distance;
    }
  })
  console.info(`2: Submarine x-distance: ${x} with a depth of ${depth}`);

  return x * depth;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
