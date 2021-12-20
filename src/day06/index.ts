import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const list = rawInput.split(',').map((v: any) => v - 0);
  return makeList(list.filter(x => x === 0).length, list.filter(x => x === 1).length, list.filter(x => x === 2).length,
    list.filter(x => x === 3).length, list.filter(x => x === 4).length, list.filter(x => x === 5).length, 0, 0, 0);
};

const makeList = (a: number,b: number,c: number,d: number,e: number,f: number,g: number, h: number, i: number) => ({
  0: a, 1: b, 2: c, 3: d, 4: e, 5: f, 6:g, 7: h, 8: i
});

const part1 = (rawInput: string) => {
  let input = parseInput(rawInput);

  for (let i = 0; i < 80; i++) {
    input = makeList(input[1], input[2], input[3], input[4], input[5], input[6], input[7]+input[0], input[8], input[0])
  }

  return input[0]+input[1]+input[2]+input[3]+input[4]+input[5]+input[6]+input[7]+input[8] + '';
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  for (let i = 0; i < 256; i++) {
    input = makeList(input[1], input[2], input[3], input[4], input[5], input[6], input[7]+input[0], input[8], input[0])
  }

  return input[0]+input[1]+input[2]+input[3]+input[4]+input[5]+input[6]+input[7]+input[8] + '';
};

run({
  part1: {
    tests: [
      // {
      //   input: `3,4,3,1,2`, // 18 days
      //   expected: "26",
      // },
      {
        input: `3,4,3,1,2`, // 80 days
        expected: "5934",
      },
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
