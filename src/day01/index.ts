import run from "aocrunner";

const parseInput = (rawInput: string): number[] => {
  const list = rawInput.split('\n');
  return list.map((elem: any) => elem - 0);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let adv = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] < input[i+1]) adv += 1;
  }

  return adv;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let adv = 0;
  for (let i = 0; i < input.length - 3; i++) {
    const currSum = input[i] + input[i+1] + input[i+2];
    const nextSum = input[i+1] + input[i+2] + input[i+3];
    if (currSum < nextSum) adv += 1;
  }

  return adv;
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
