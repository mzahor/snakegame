import { IGameState } from "./interfaces";
import { CellType, IRenderer, IScore } from "./interfaces";

export default class Renderer implements IRenderer {
  private static readonly CELL_CLASS_NAME = "pg-cell";
  private static readonly ROW_CLASS_NAME = "pg-row";
  private static readonly TYPES = {
    [CellType.Head]: "head",
    [CellType.Body]: "body",
    [CellType.Food]: "food",
    [CellType.Empty]: "empty",
  };
  private container: HTMLElement;
  private table: HTMLTableElement;
  private tbody: HTMLTableSectionElement;
  private highScore;
  private score;
  private scoreContainer;

  constructor(sizes) {
    this.container = document.getElementById("app");

    this._init(sizes.width, sizes.height);
  }

  public render({ playground, state, score }: IGameState) {
    const self = this;

    playground.forEach((row, x) => {
      const tRow = self.table.rows[x];
      row.forEach((type, y) => {
        const tCell = tRow.cells[y];
        tCell.className = self._getClassName(type);
      });
    });

    this._renderScore(score);
  }

  private _getClassName(type) {
    return Renderer.TYPES[type] ?
      Renderer.CELL_CLASS_NAME + " " + Renderer.TYPES[type] :
      Renderer.CELL_CLASS_NAME;
  }

  private _init(width, height) {
    this.table = document.createElement("table");
    this.tbody = document.createElement("tbody");
    this.highScore = document.createElement("h1");
    this.score = document.createElement("h2");
    this.scoreContainer = document.createElement("div");
    this.scoreContainer.className = "score";
    this.table.className = "playground";
    this.tbody.className = "";

    this._createRows(width, height);

    this.table.appendChild(this.tbody);
    this.container.appendChild(this.table);
    this.scoreContainer.appendChild(this.highScore);
    this.scoreContainer.appendChild(this.score);
    this.container.appendChild(this.scoreContainer);
  }

  private _renderScore({ score, highScore }: IScore) {
    this.highScore.innerText = highScore;
    this.score.innerText = score;
  }

  private _createRows(width, height) {
    for (let x = 0; x < width; x++) {
      const tRow = this._createRow();
      for (let y = 0; y < height; y++) {
        this._createCell(tRow);
      }
    }
  }

  private _createRow() {
    const row = this.tbody.insertRow(-1);
    row.className = Renderer.ROW_CLASS_NAME;
    return row;
  }

  private _createCell(row) {
    const cell = row.insertCell(-1);
    cell.className = Renderer.CELL_CLASS_NAME;
  }
}
