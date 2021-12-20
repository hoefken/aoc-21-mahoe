import run from "aocrunner";
import { Board } from "../utils/Board.js";

const parseInput = (rawInput: string): {draw: number[], boards: number[][], rowLength: number} => {
  const list = rawInput.split('\n');
  const draw = list.shift()!.split(',').map((v: any) => v - 0);
  list.shift();
  const rowLength = list[0]!.split(' ').filter(e => e !== '').length;
  const boards = [];
  let board: any[] = [];
  while (list.length > 0) {
    const row = list.shift()!.split(' ').filter(e => e !== '');
    if (row.length !== 0) {
      board.push(...row);
    }
    if (row.length === 0 || list.length === 0) {
      boards.push(board.map((v: any) => v - 0));
      board = [];
    }
  }
  return { draw, boards, rowLength };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const boards: Board[] = [];
  input.boards.forEach(board => {
    boards.push(new Board(board, input.rowLength, input.rowLength));
  })
  let numbersDrawn = 0;
  let winnerBoard: Board;
  let isWon = false;
  input.draw.forEach((draw) => {
    if (!isWon) {
      numbersDrawn += 1;
      boards.forEach((board) => {
        if (!isWon) {
          board.drawNumber(draw);
          if (numbersDrawn >= input.rowLength && board.isWon) {
            winnerBoard = board;
            isWon = true;
          }
        }
      })
    }
  });
  console.info(`We have a winner after ${numbersDrawn} numbers drawn. \nWinner Board looks like this:`)
  winnerBoard!.printMarked();
  return winnerBoard!.score + "";
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let boards: Board[] = [];
  input.boards.forEach(board => {
    boards.push(new Board(board, input.rowLength, input.rowLength));
  })
  let numbersDrawn = 0;
  let loserBoards: Board[] = boards;
  let winnerBoards: Board[] = [];
  input.draw.forEach((draw) => {
    numbersDrawn += 1;
    const tmpBoards: Board[] = [];
    loserBoards.forEach((board) => {
      if (!board.isWon){
        board.drawNumber(draw);
      }
      if (!board.isWon) {
        tmpBoards.push(board);
      } else {
        // console.info(`Another Board won after ${numbersDrawn} draws with number ${draw}`);
        // board.printWinCondition();
        winnerBoards.push(board);
      }
    });
    loserBoards = tmpBoards;
  });
  console.info(`We have a winner after ${input.draw.indexOf(winnerBoards[winnerBoards.length - 1].lastDraw ?? -1) + 1} numbers drawn. \nWinner Board looks like this:`)
  console.log('last number drawn: ' + winnerBoards[winnerBoards.length - 1].lastDraw)
  winnerBoards[winnerBoards.length - 1]!.printWinCondition();
  return winnerBoards[winnerBoards.length - 1]!.score + "";
};

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: "4512",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: "1924",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
