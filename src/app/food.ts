import { IPoint } from "./interfaces";

export default class Food {
  public position;

  constructor(private settings) {
    this.position = {};
  }

  public isHere(x: number, y: number) {
    return this.position.x === x && this.position.y === y;
  }

  public placeFood(snake: IPoint[]) {
    const coords = this._getRandomCords();
    if (this._isOutOfBounds(coords) ||
      snake.some((part) => part.x === coords.x && part.y === coords.y)) {
      this.placeFood(snake);
    } else {
      this.position = coords;
    }
  }

  private _isOutOfBounds(coords) {
    return (
        coords.x < 0 ||
        coords.y < 0 ||
        coords.x >= this.settings.size.height ||
        coords.y >= this.settings.size.width
    );
  }

  private _getRandomCords() {
    return {
      x: Math.floor((Math.random() * this.settings.size.width - 1)),
      y: Math.floor((Math.random() * this.settings.size.height - 1)),
    };
  }
}
