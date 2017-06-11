export interface IPoint {
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface ISettings {
  speed: number;
  size: ISize;
}

export interface IScore {
  highScore: number;
  score: number;
}

export interface IController {
  onLeft: (cb: () => void) => void;
  onRight: (cb: () => void) => void;
  onUp: (cb: () => void) => void;
  onDown: (cb: () => void) => void;
  init();
}

export enum CellType {
    Head = 0,
    Body,
    Food,
    Empty,
}
