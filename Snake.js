class Snake {
  constructor(position) {
    this.snake = [Object.assign({}, position)];
  }
  
  move(dx, dy) {
    this._stepAhead(dx, dy);
    this.snake.pop();
  }
  
  eat(dx, dy) {
    this._stepAhead(dx, dy);
  }
  
  isHeadHere(x, y) {
    let head = this.snake[0];
    return head.x === x && head.y === y;
  }
  
  isBodyHere(x, y) {
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[i].x === x && this.snake[i].y === y) {
        return true;
      }
    }
    
    return false;
  }
  
  getHead() {
    return this.snake[0];
  }
  
  hasEatenItself() {
    const head = this.getHead();
    return this.isBodyHere(head.x, head.y);
  }
  
  _stepAhead(dx, dy) {
    let head = Object.assign({}, this.snake[0]);
    head.x += dx;
    head.y += dy;
    this.snake.unshift(head);
  }
}