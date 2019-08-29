import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
})
export class PlayerBoardComponent implements OnInit {
  @Input() player: any;
  @Input() nbPlayers: number;
  public randomDiceToShow = 1;
  public randomDiceAnimationIsActive = false;

  constructor() {}

  ngOnInit() {}
  randomizeAnimation() {
    this.randomDiceAnimationIsActive = true;
    const interval = setInterval(() => {
      this.randomDiceToShow = Math.floor(1 + Math.random() * Math.floor(6));
    }, 70);
    setTimeout(() => {
      clearInterval(interval);
      this.randomDiceToShow = this.player.order;
      setTimeout(() => {
        this.randomDiceAnimationIsActive = false;
      }, 2000);
    }, 2000);
  }
}
