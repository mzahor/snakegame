import { IGameState } from "./interfaces";
import { CellType, IRenderer, IScore } from "./interfaces";
import "./renderer.css";
import utils from "./utils";

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
  private gameStateContainer;

  constructor(sizes) {
    this.container = document.getElementById("app");

    this._init(sizes.width, sizes.height);
  }

  public render({ playground, state, score, onReset }: IGameState) {
    const self = this;

    playground.forEach((row, x) => {
      const tRow = self.table.rows[x];
      row.forEach((type, y) => {
        const tCell = tRow.cells[y];
        tCell.className = self._getClassName(type);
      });
    });

    this._renderScore(score);
    this._renderState(state);

    if (state === "over") {
      this._renderResetButton(onReset);
      this.table.classList.add("game-over");
      this.scoreContainer.classList.add("game-over");
      this.gameStateContainer.classList.add("game-over");
    } else {
      this.table.classList.remove("game-over");
      this.scoreContainer.classList.remove("game-over");
      this.gameStateContainer.classList.remove("game-over");
    }
  }

  private _getClassName(type) {
    return Renderer.TYPES[type] ?
      Renderer.CELL_CLASS_NAME + " " + Renderer.TYPES[type] :
      Renderer.CELL_CLASS_NAME;
  }

  private _init(width, height) {
    this.gameStateContainer = utils.createEl({
      tag: "div",
      target: this.container,
      className: "game-state",
    });

    this.table = utils.createEl({
      tag: "table",
      target: this.container,
      className: "playground",
    }) as HTMLTableElement;

    this.tbody = utils.createEl({
      tag: "tbody",
      target: this.table,
    }) as HTMLTableSectionElement;

    this.scoreContainer = utils.createEl({
      tag: "div",
      target: this.container,
      className: "score",
    });

    this.highScore = utils.createEl({
      tag: "h1",
      target: this.scoreContainer,
    });

    this.score = utils.createEl({
      tag: "h2",
      target: this.scoreContainer,
    });

    this._createRows(width, height);
  }

  private _renderScore({ score, highScore }: IScore) {
    this.highScore.innerHTML = `
      High-Score: ${highScore}
    `;
    this.score.innerHTML = `
      Score: ${score}
    `;
  }

  private _renderState(state) {
    switch (state) {
      case "over":
        state = "Game Over";
        break;
      case "notStarted":
        state = "Use Arrow Keys";
        break;
    }
    this.gameStateContainer.innerHTML = `
      <h1>${state}</h1>
    `;
  }

  private _renderResetButton(onReset) {
    const button = utils.createEl({
      tag: "button",
      className: "reset-button",
      target: this.gameStateContainer,
    });
    button.innerText = "Restart";
    button.onclick = onReset;
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
