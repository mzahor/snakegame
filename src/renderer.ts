import { HEAD, BODY, FOOD, EMPTY } from './constants';

export default class Renderer {
  private CELL_CLASS_NAME;
  private ROW_CLASS_NAME;
  private TYPES;
  private container_;
  private table_;
  private tbody_;
  private highScore_;
  private score_;
  private scoreContainer_;

  constructor(sizes) {
    this.CELL_CLASS_NAME = 'pg-cell';
    this.ROW_CLASS_NAME = 'pg-row';
    this.TYPES = {
      [HEAD]: 'head',
      [BODY]: 'body',
      [FOOD]: 'food',
      [EMPTY]: 'empty'
    }
    this.container_ = document.getElementById('app');

    this._init(sizes.width, sizes.height);
  }

  render({playground, state}) {
    const self = this;

    playground.forEach((row, x) => {
      let tRow = self.table_.rows[x];
      row.forEach((type, y) => {
        let tCell = tRow.cells[y];
        tCell.className = self._getClassName(type);
      });
    });

    this._renderScore(state.score);
  }

  _getClassName(type) {
    return this.TYPES[type] ?
        this.CELL_CLASS_NAME + ' ' + this.TYPES[type] :
        this.CELL_CLASS_NAME;
  }

  _init(width, height) {
    this.table_ = document.createElement('TABLE');
    this.tbody_ = document.createElement('TBODY');
    this.highScore_ = document.createElement('h1');
    this.score_ = document.createElement('h2');
    this.scoreContainer_ = document.createElement('DIV');
    this.scoreContainer_.className = 'score';
    this.table_.className = 'playground';
    this.tbody_.className = ''

    this._createRows(width, height);

    this.table_.appendChild(this.tbody_);
    this.container_.appendChild(this.table_);
    this.scoreContainer_.appendChild(this.highScore_);
    this.scoreContainer_.appendChild(this.score_);
    this.container_.appendChild(this.scoreContainer_);
  }

  _renderScore({score, highScore}) {
    this.highScore_.innerText = highScore;
    this.score_.innerText = score;
  }

  _createRows(width, height) {
    for (let x = 0; x < width; x++) {
      let tRow = this._createRow();
      for (let y = 0; y < height; y++) {
        this._createCell(tRow);
      }
    }
  }

  _createRow() {
    let row = this.tbody_.insertRow(-1);
    row.className = this.ROW_CLASS_NAME;
    return row;
  }

  _createCell(row) {
    let cell = row.insertCell(-1);
    cell.className = this.CELL_CLASS_NAME;
  }
}
