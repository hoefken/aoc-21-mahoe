import run from "aocrunner";
import { VentLine, VentMap } from "../utils/VentMap.js";

const parseInput = (rawInput: string): VentLine[] => {
  let list = rawInput.split('\n').map((elem) => elem.split(' -> '));
  return list.map(points => {
    const rawfrom = points[0].split(',').map((v: any) => v - 0);
    const rawto = points[1].split(',').map((v: any) => v - 0);
    return {
      from: {
        x: rawfrom[0],
        y: rawfrom[1],
        raw: rawfrom
      },
      to: {
        x: rawto[0],
        y: rawto[1],
        raw: rawto
      }
    }
  })
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const map = new VentMap(input);
  map.generateVentMap(false);
  return map.score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const map = new VentMap(input);
  map.generateVentMap(true);
  return map.score;
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: "5",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: "12",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
