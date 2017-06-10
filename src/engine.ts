import { HEAD, BODY, FOOD, EMPTY } from './constants';
import Score from './score';
import Snake from './snake';
import Food from './food';

export default class Engine {
  private settings;
  private score;
  private snake;
  private food;
  private playground;
  private dx;
  private dy;
  private _state;
  private state;
  private gameState;
  private _interval;
  private ctrl;
  private tickCb;

  constructor(settings) {
    this.settings = settings;
    this.score = new Score();
    this.snake = new Snake({x: 0, y: 0});
    this.food = new Food(settings);
    this.food.placeFood(this.snake.snake);
    this.playground = this._generatePlayground();
    this.dx = 1;
    this.dy = 0;

    this._state = ''

    this.gameState = {
      state: {
        game: 'notStarted'
      },
      playground: this.playground
    }
  }

  setController(ctrl) {
    this.ctrl = ctrl;
    this.ctrl.onLeft(this._left.bind(this));
    this.ctrl.onRight(this._right.bind(this));
    this.ctrl.onUp(this._up.bind(this));
    this.ctrl.onDown(this._down.bind(this));
    this.ctrl.init();
  }

  start() {
    if (this.state !== 'started') {
      this._interval = setInterval(this._tick.bind(this), this.settings.speed);
    }
  }

  _left() {
    this.dx = -1;
    this.dy = 0;
  }

  _right() {
    this.dx = 1;
    this.dy = 0;
  }

  _up() {
    this.dy = -1;
    this.dx = 0;
  }

  _down() {
    this.dy = 1;
    this.dx = 0;
  }

  onTick(cb) {
    this.tickCb = cb;
  }

  _tick() {
    const self = this;

    if (this.snake.isHeadHere(this.food.position.x, this.food.position.y)) {
      this.snake.eat(this.dx, this.dy);
      this.food.placeFood(this.snake.snake);
      this.score.hit();
    } else {
      this.snake.move(this.dx, this.dy);
    }

    if (this._isGameOver()) {
      this.score.reset();
      this.gameState.state.game = 'over';
      clearInterval(this._interval);
    }

    this.gameState.playground = this._generatePlayground();
    this.gameState.state.score = this.score.getScore();
    this.tickCb(this.gameState);
  }

  _isGameOver() {
    return this.snake.hasEatenItself() || this._isOutOfBounds();
  }

  _isOutOfBounds() {
    const head = this.snake.getHead();
    const size = this.settings.size;

    return head.x < 0 || head.y < 0 || head.x > size.x || head.y > size.y;
  }

  _generatePlayground() {
    let size = this.settings.size;
    let playground = Array(size.height);

    for (let y = 0; y < size.height; y++) {
      let row = Array(size.width);

      for (let x = 0; x < size.width; x++) {
        if (this.snake.isHeadHere(x, y)) {
          row[x] = HEAD;
        } else if (this.snake.isBodyHere(x, y)) {
          row[x] = BODY;
        } else if (this.food.isHere(x, y)) {
          row[x] = FOOD;
        } else {
          row[x] = EMPTY;
        }
      }

      playground[y] = row;
    }

    return playground;
  }
}

