export default class Controller {
  constructor() {
  }

  init() {
    const self = this;
    document.addEventListener('keydown', function(event) {
      switch (event.code) {
        case 'ArrowUp':
          self.upCb();
          break;
        case 'ArrowDown':
          self.downCb();
          break;
        case 'ArrowLeft':
          self.leftCb();
          break;
        case 'ArrowRight':
          self.rightCb();
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