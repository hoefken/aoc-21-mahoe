export class VentMap {
  map: number[][];
  source: VentLine[];

  constructor(source: VentLine[]) {
    this.source = source;
    this.map = Array.from({length: 1000}, () => Array.from({length: 1000}, () => 0));
  }

  get score(): string {
    let sum = 0;
    this.map.forEach(row => sum += row.filter(v => v >= 2).length);
    return sum + '';
  }

  generateVentMap(diag?: boolean): void {
    this.source.forEach(ventLine => {
      if(ventLine.from.x === ventLine.to.x) {
        this.mapVerticalVentLine(ventLine);
      } else if(ventLine.from.y === ventLine.to.y) {
        this.mapHorizontalVentLine(ventLine);
      } else if(diag && this.is45Degrees(ventLine)){
        this.mapDiagonalVentLine(ventLine);
      }
      // this.printMapInBoundary(0,0,10,10);
    })
  }

  printMapInBoundary(x1: number, y1: number, x2: number, y2: number): void {
    console.info(`Map Data from [${x1},${y1}] to [${x2},${y2}]`)
    for (let i = y1; i < y2; i++) {
      console.info(this.map[i].slice(x1, x2).map(x => x === 0 ? '.' : x).join(' '))
    }
  }

  is45Degrees(line: VentLine): boolean {
    const distanceX = line.to.x - line.from.x;
    const distanceY = line.to.y - line.from.y;
    return Math.abs(distanceX) === Math.abs(distanceY);
  }

  mapDiagonalVentLine(line: VentLine): void {
    const distanceX = line.to.x - line.from.x;
    const distanceY = line.to.y - line.from.y;

    for (let i = 0; i <= Math.abs(distanceX); i++) {
      this.map[line.from.y + (distanceY > 0 ? i : -i)][line.from.x + (distanceX > 0 ? i : -i)] += 1;
    }
  }

  mapHorizontalVentLine(line: VentLine): void {
    const distance = line.to.x - line.from.x;

    for (let i = 0; i <= Math.abs(distance); i++) {
      this.map[line.from.y][line.from.x + (distance > 0 ? i : -i)] += 1;
    }
  }

  mapVerticalVentLine(line: VentLine): void {
    const distance = line.to.y - line.from.y;

    for (let i = 0; i <= Math.abs(distance); i++) {
      this.map[line.from.y + (distance > 0 ? i : -i)][line.from.x] += 1;
    }
  }
}

export interface VentLine {
  from: {x: number, y: number, raw?: number[]}, to: {x: number, y: number, raw: number[]}
}
