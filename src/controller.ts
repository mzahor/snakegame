export interface IController {
  onLeft: (cb: () => void) => void;
  onRight: (cb: () => void) => void;
  onUp: (cb: () => void) => void;
  onDown: (cb: () => void) => void;
}

export default class Controller implements IController {
  private upCb;
  private downCb;
  private leftCb;
  private rightCb;

  public init() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowUp":
          this.upCb();
          break;
        case "ArrowDown":
          this.downCb();
          break;
        case "ArrowLeft":
          this.leftCb();
          break;
        case "ArrowRight":
          this.rightCb();
          break;
      }
    });
  }

  public onLeft(cb: () => void) {
    this.leftCb = cb;
  }

  public onRight(cb: () => void) {
    this.rightCb = cb;
  }

  public onUp(cb: () => void) {
    this.upCb = cb;
  }

  public onDown(cb: () => void) {
    this.downCb = cb;
  }
}
