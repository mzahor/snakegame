import { Point } from './interfaces';

export default class Snake {
  public snake: Point[];

  constructor(position: Point) {
    this.snake = [{ ...position }];
  }

  public move(dx, dy) {
    this.stepAhead(dx, dy);
    this.snake.pop();
  }

  public eat(dx, dy) {
    this.stepAhead(dx, dy);
  }

  public isHeadHere(x, y) {
    let head = this.snake[0];
    return head.x === x && head.y === y;
  }

  public isBodyHere(x, y) {
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[i].x === x && this.snake[i].y === y) {
        return true;
      }
    }

    return false;
  }

  public getHead() {
    return this.snake[0];
  }

  public hasEatenItself() {
    const head = this.getHead();
    return this.isBodyHere(head.x, head.y);
  }

  private stepAhead(dx, dy) {
    let head = { ...this.snake[0] };

    head.x += dx;
    head.y += dy;

    this.snake.unshift(head);
  }
}