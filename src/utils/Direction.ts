export enum Direction {
  UP,
  FORWARD,
  DOWN,
  BACKWARD,
  UNKNOWN
}

export interface Instruction {
  direction: Direction;
  distance: number;
}

export function parseDirection(instruction: string): Direction {
  if (instruction === 'forward') {
    return Direction.FORWARD;
  } else if (instruction === 'up') {
    return Direction.UP;
  } else if (instruction === 'down') {
    return Direction.DOWN;
  } else if (instruction === 'backward') {
    return Direction.BACKWARD;
  } else return Direction.UNKNOWN
}