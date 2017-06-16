import { IScore } from "./interfaces";

export default class Scorer {
  private hits: number;
  private highScore: number;
  private scoreValue: number;
  private score: number;

  constructor() {
    this.hits = 0;
    this.score = 0;
    this.scoreValue = 100;
    this.highScore = +localStorage.getItem("high-score") || 0;
  }

  public hit() {
    this.hits++;
    this.score = this.hits * this.scoreValue;
  }

  public getScore(): IScore {
    return {
      highScore: Math.max(this.highScore, this.score),
      score: this.score,
    };
  }

  public reset() {
    this.hits = 0;
    this.highScore = Math.max(this.highScore, this.score);
    localStorage.setItem("high-score", this.highScore.toString());
  }
}
