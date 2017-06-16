import Food from "./food";
import {
  CellType,
  IController,
  IGameState,
  IRenderer,
  IScore,
  ISettings,
} from "./interfaces";
import Scorer from "./scorer";
import Snake from "./snake";

export default class Engine {
  private renderer: IRenderer;
  private scorer: Scorer;
  private snake: Snake;
  private food: Food;
  private playground: number[][];
  private dx: number;
  private dy: number;
  private gameState: IGameState;
  private tickHandle: number;
  private ctrl: IController;
  private tickCb: (state: IGameState) => void;
  private onReset: () => void;

  constructor(private settings: ISettings) {
    this.snake = new Snake({ x: 0, y: 0 });
    this.food = new Food(settings);
    this.food.placeFood(this.snake.snake);
    this.playground = this.generatePlayground();
    this.scorer = new Scorer();
    this.dx = 0;
    this.dy = 0;

    this.gameState = {
      playground: this.playground,
      state: "notStarted",
      score: this.scorer.getScore(),
      onReset: this.reset.bind(this),
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

  public setRenderer(renderer: IRenderer) {
    this.renderer = renderer;
  }

  public start() {
    if (this.gameState.state !== "started") {
      this.tickHandle = setInterval(this.tick.bind(this), this.settings.speed);
    }
  }

  private reset() {
    this.snake = new Snake({ x: 0, y: 0 });
    this.food.placeFood(this.snake.snake);
    this.playground = this.generatePlayground();
    this.scorer.reset();
    this.dx = 0;
    this.dy = 0;

    this.gameState.score = this.scorer.getScore();
    this.gameState.playground = this.playground;
    this.gameState.state = "notStarted";

    this.start();
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
      clearInterval(this.tickHandle);
    } else {
      this.gameState.playground = this.generatePlayground();
    }

    this.gameState.score = this.scorer.getScore();

    this.renderer.render(this.gameState);
  }

  private isGameOver(): boolean {
    return (
      this.snake.hasEatenItself() ||
      this.snake.isOutOfBounds(this.settings.size)
    );
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
