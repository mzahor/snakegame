import { IScore } from "./interfaces";

export default class Scorer {
  private hits: number;
  private highScore: number;
  private scoreValue: number;
  private score: number;

  constructor() {
    this.hits = 0;
    this.highScore = 0;
    this.scoreValue = 100;
  }

  public hit() {
    this.hits++;
  }

  public getScore(): IScore {
    return {
      highScore: Math.max(this.highScore, this.score),
      score: this.hits * this.scoreValue,
    };
  }

  public reset() {
    this.highScore = Math.max(this.highScore, this.score);
  }
}
