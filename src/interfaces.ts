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

export enum CellType {
    Head = 0,
    Body,
    Food,
    Empty,
}
