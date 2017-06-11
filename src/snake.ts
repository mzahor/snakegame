import { IPoint } from "./interfaces";

export default class Snake {
  public snake: IPoint[];

  constructor(position: IPoint) {
    this.snake = [{ ...position }];
  }

  public move(dx: number, dy: number): void {
    this.stepAhead(dx, dy);
    this.snake.pop();
  }

  public eat(dx: number, dy: number) {
    this.stepAhead(dx, dy);
  }

  public isHeadHere(x: number, y: number): boolean {
    const head = this.getHead();
    return head.x === x && head.y === y;
  }

  public isBodyHere(x, y): boolean {
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[i].x === x && this.snake[i].y === y) {
        return true;
      }
    }

    return false;
  }

  public getHead(): IPoint {
    return this.snake[0];
  }

  public hasEatenItself(): boolean {
    const head = this.getHead();
    return this.isBodyHere(head.x, head.y);
  }

  private stepAhead(dx: number, dy: number): void {
    const head = { ...this.snake[0] };

    head.x += dx;
    head.y += dy;

    this.snake.unshift(head);
  }
}
