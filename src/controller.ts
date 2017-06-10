export default class Controller {
  private upCb;
  private downCb;
  private leftCb;
  private rightCb;

  constructor() {
  }

  public init() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.upCb();
          break;
        case 'ArrowDown':
          this.downCb();
          break;
        case 'ArrowLeft':
          this.leftCb();
          break;
        case 'ArrowRight':
          this.rightCb();
          break;
      }
    });
  }

  public onLeft(cb) {
    this.leftCb = cb;
  }

  public onRight(cb) {
    this.rightCb = cb;
  }

  public onUp(cb) {
    this.upCb = cb;
  }

  public onDown(cb) {
    this.downCb = cb;
  }
}