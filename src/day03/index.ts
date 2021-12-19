import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const list = rawInput.split('\n');
  return list.map((elem) => elem.split('').map((bit: any) => bit - 0));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const bits = input[0].length;
  const sum = new Array(bits).fill(0);
  input.forEach((row) => {
    row.forEach((value, index) => sum[index] += value);
  })
  let gamma = new Array(bits).fill(0);
  let epsilon = new Array(bits).fill(0);
  sum.forEach((value, index) => {
    if (value > input.length / 2) {
      gamma[index] = 1;
      epsilon[index] = 0;
    } else {
      gamma[index] = 0;
      epsilon[index] = 1;
    }
  });
  const gammaDec = parseInt(gamma.join(''), 2);
  const epsilonDec = parseInt(epsilon.join(''), 2);
  const energyConsumption = gammaDec * epsilonDec;
  console.info(`1: Decimal Values for gamma: ${gammaDec} and epsilon: ${epsilonDec}. Energy Consumption is ${energyConsumption}`);
  return energyConsumption;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const bits = input[0].length;
  let gamma = new Array(bits).fill(0);
  let epsilon = new Array(bits).fill(0);
  let oxycopy = input.map(v => v);
  let cocopy = input.map(v => v);

  for (let i = 0; i < bits; i++) {
    const length = oxycopy.length;
    // console.info(`Iterate oxygen bit position ${i}. Numbers in array: ${length}`)
    if (length === 1) break;
    const copyOnesFiltered = oxycopy.filter(el => el[i] === 1);
    const sum = copyOnesFiltered.length;
    // console.info(`Number of 1 bits ${sum}. More than half: ${(sum > length / 2)}`)
    gamma[i] = (sum >= length / 2) ? 1 : 0;
    oxycopy = gamma[i] === 1 ? copyOnesFiltered : oxycopy.filter(el => el[i] === 0);
  }

  for (let i = 0; i < bits; i++) {
    const length = cocopy.length;
    // console.info(`Iterate co2 bit position ${i}. Numbers in array: ${length}`)
    if (length === 1) break;
    const copyOnesFiltered = cocopy.filter(el => el[i] === 1);
    const sum = copyOnesFiltered.length;
    epsilon[i] = (sum >= length / 2) ? 0 : 1;
    cocopy = epsilon[i] === 1 ? copyOnesFiltered : cocopy.filter(el => el[i] === 0);
  }

  const oxygenDec = parseInt(oxycopy[0]?.join(''), 2) ?? 0;
  const coDec = parseInt(cocopy[0]?.join(''), 2) ?? 0;
  const lifeSupportRating = oxygenDec * coDec;
  console.info(`2: Decimal Values for Oxygen: ${oxygenDec} and CO2: ${coDec}. Life Support Rating is ${lifeSupportRating}`);
  return lifeSupportRating;
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
