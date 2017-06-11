import Food from "./food";
import { CellType, IController, IScore, ISettings } from "./interfaces";
import Scorer from "./scorer";
import Snake from "./snake";

export interface IGameState {
  playground: number[][];
  state: string;
  score: IScore;
}

export default class Engine {
  private scorer: Scorer;
  private snake: Snake;
  private food: Food;
  private playground: number[][];
  private dx: number;
  private dy: number;
  private gameState: IGameState;
  private interval: number;
  private ctrl: IController;
  private tickCb: (state: IGameState) => void;

  constructor(private settings: ISettings) {
    this.snake = new Snake({x: 0, y: 0});
    this.food = new Food(settings);
    this.food.placeFood(this.snake.snake);
    this.playground = this.generatePlayground();
    this.scorer = new Scorer();
    this.dx = 1;
    this.dy = 0;

    this.gameState = {
      playground: this.playground,
      state: "notStarted",
      score: this.scorer.getScore(),
    };
  }

  public setController(ctrl: IController) {
    this.ctrl = ctrl;
    this.ctrl.onLeft(this.left.bind(this));
    this.ctrl.onRight(this.right.bind(this));
    this.ctrl.onUp(this.up.bind(this));
    this.ctrl.onDown(this.down.bind(this));
    this.ctrl.init();
  }

  public start() {
    if (this.gameState.state !== "started") {
      this.interval = setInterval(this.tick.bind(this), this.settings.speed);
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
      this.scorer.hit();
    } else {
      this.snake.move(this.dx, this.dy);
    }

    if (this.isGameOver()) {
      this.scorer.reset();
      this.gameState.state = "over";
      clearInterval(this.interval);
    } else {
      this.gameState.playground = this.generatePlayground();
    }

    this.gameState.score = this.scorer.getScore();

    this.tickCb(this.gameState);
  }

  private isGameOver(): boolean {
    return this.snake.hasEatenItself() || this.isOutOfBounds();
  }

  private isOutOfBounds(): boolean {
    const head = this.snake.getHead();
    const size = this.settings.size;

    return head.x < 0 || head.y < 0 || head.x > size.width || head.y > size.height;
  }

  private generatePlayground(): number[][] {
    const size = this.settings.size;
    const playground = Array(size.height);

    for (let y = 0; y < size.height; y++) {
      const row = Array(size.width);

      for (let x = 0; x < size.width; x++) {
        if (this.snake.isHeadHere(x, y)) {
          row[x] = CellType.Head;
        } else if (this.snake.isBodyHere(x, y)) {
          row[x] = CellType.Body;
        } else if (this.food.isHere(x, y)) {
          row[x] = CellType.Food;
        } else {
          row[x] = CellType.Empty;
        }
      }

      playground[y] = row;
    }

    return playground;
  }
}
