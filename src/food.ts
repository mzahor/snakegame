export default class Food {
  public position;

  constructor(private settings) {
    this.position = {};
  }

  isHere(x, y) {
    return this.position.x === x && this.position.y === y;
  }

  placeFood(snake) {
    let coords = this._getRandomCords();
    if (snake.some((part) => part.x === coords.x && part.y === coords.y)) {
      this.placeFood(snake);
    } else {
      this.position = coords;
    }
  }

  _getRandomCords() {
    return {
      x: Math.floor((Math.random() * this.settings.size.width - 1)),
      y: Math.floor((Math.random() * this.settings.size.height - 1))
    }
  }
}
