export default class Controller {
  private upCb;
  private downCb;
  private leftCb;
  private rightCb;

  constructor() {
  }

  init() {
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

  onLeft(cb) {
    this.leftCb = cb;
  }

  onRight(cb) {
    this.rightCb = cb;
  }

  onUp(cb) {
    this.upCb = cb;
  }

  onDown(cb) {
    this.downCb = cb;
  }
}