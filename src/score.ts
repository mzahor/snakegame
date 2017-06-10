export default class Score {
  private hits;
  private highScore;
  private scoreValue;
  private score;

  constructor() {
    this.hits = 0;
    this.highScore = 0;
    this.scoreValue = 100;
  }

  hit() {
    this.hits++;
  }

  getScore() {
    return {
      score: this.hits * this.scoreValue,
      highScore: Math.max(this.highScore, this.score)
    };
  }

  reset() {
    this.highScore = Math.max(this.highScore, this.score);
  }
}