export class Board {
  x: number;
  y: number;
  values: number[];
  marked: boolean[];
  lastDraw?: number;

  constructor(values: number[], x: number, y: number) {
    this.values = values;
    this.x = x;
    this.y = y;
    this.marked = new Array(values.length).fill(false);
  }

  drawNumber(draw: number): void {
    const index = this.values.indexOf(draw);
    if (index !== -1) this.marked[index] = true;
    this.lastDraw = draw;
  }

  get score(): number {
    const numbersNotMarked = this.values.filter((e, i) => !this.marked[i]);
    const sum = numbersNotMarked.reduce((previousValue, currentValue) => previousValue + currentValue);
    return sum * this.lastDraw!;
  }

  get isWon(): boolean {
    let won: boolean[] = []
    for (let i = 0; i < this.y; i++) {
      won.push(this.checkHorizontal(i));
      for (let j = 0; j < this.x; j++) {
        won.push(this.checkVertical(j));
      }
    }
    return won.filter(v => v).length >= 1;
  }

  checkHorizontal(index: number): boolean {
    return this.marked.slice(this.x * index, (this.x * (index + 1))).filter(x => x).length === this.x;
  }

  checkVertical(index: number): boolean {
    const vertMarked = [];
    for (let j = 0; j < this.y; j++) {
      vertMarked.push(this.marked[((j * (this.x)) + index)]);
    }
    return vertMarked.filter(x => x).length === this.y;
  }


  printMarked(): void {
    for (let i = 0; i < this.y; i++) {
      console.log(this.marked.slice(this.x * i, (this.x * (i+1))).map(x => x ? 'x' : 'o').join('|'))
    }
  }

  printWinCondition(): void {
    let wonX: boolean[] = new Array(this.x);
    let wonY: boolean[] = new Array(this.y);
    for (let i = 0; i < this.y; i++) {
      wonY[i] = this.checkHorizontal(i);
      for (let j = 0; j < this.x; j++) {
        wonX[j] = this.checkVertical(j)
      }
    }
    console.log(wonX.map(v => v ? 't' : 'f').join('|'));
    for (let i = 0; i < this.y; i++) {
      console.log(this.marked.slice(this.x * i, (this.x * (i+1))).map(x => x ? 'x' : 'o').join('|') + '|' + (wonY[i] ? 't' : 'f'))
    }
  }
}
