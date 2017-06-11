import { HEAD, BODY, FOOD, EMPTY } from './constants';
import { Settings } from './interfaces';
import Score from './score';
import Snake from './snake';
import Food from './food';

export default class Engine {
  private score: Score;
  private snake: Snake;
  private food: Food;
  private playground;
  private dx;
  private dy;
  private _state;
  private state;
  private gameState;
  private _interval;
  private ctrl;
  private tickCb: Function;

  constructor(private settings: Settings) {
    this.score = new Score();
    this.snake = new Snake({x: 0, y: 0});
    this.food = new Food(settings);
    this.food.placeFood(this.snake.snake);
    this.playground = this.generatePlayground();
    this.dx = 1;
    this.dy = 0;

    this._state = '';

    this.gameState = {
      state: {
        game: 'notStarted'
      },
      playground: this.playground
    }
  }

  public setController(ctrl) {
    this.ctrl = ctrl;
    this.ctrl.onLeft(this.left.bind(this));
    this.ctrl.onRight(this.right.bind(this));
    this.ctrl.onUp(this.up.bind(this));
    this.ctrl.onDown(this.down.bind(this));
    this.ctrl.init();
  }

  public start() {
    if (this.state !== 'started') {
      this._interval = setInterval(this.tick.bind(this), this.settings.speed);
    }
  }

  public onTick(cb) {
    this.tickCb = cb;
  }

  private left() {
    this.dx = -1;
    this.dy = 0;
  }

  private right() {
    this.dx = 1;
    this.dy = 0;
  }

  private up() {
    this.dy = -1;
    this.dx = 0;
  }

  private down() {
    this.dy = 1;
    this.dx = 0;
  }

  private tick() {
    const self = this;

    if (this.snake.isHeadHere(this.food.position.x, this.food.position.y)) {
      this.snake.eat(this.dx, this.dy);
      this.food.placeFood(this.snake.snake);
      this.score.hit();
    } else {
      this.snake.move(this.dx, this.dy);
    }

    if (this.isGameOver()) {
      this.score.reset();
      this.gameState.state.game = 'over';
      clearInterval(this._interval);
    } else {
      this.gameState.playground = this.generatePlayground();
    }

    this.gameState.state.score = this.score.getScore();
    this.tickCb(this.gameState);
  }

  private isGameOver() {
    return this.snake.hasEatenItself() || this.isOutOfBounds();
  }

  private isOutOfBounds() {
    const head = this.snake.getHead();
    const size = this.settings.size;

    return head.x < 0 || head.y < 0 || head.x > size.width || head.y > size.height;
  }

  private generatePlayground(): number[][] {
    const size = this.settings.size;
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

