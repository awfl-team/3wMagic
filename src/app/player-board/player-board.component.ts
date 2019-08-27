import { Component, Input, OnInit } from '@angular/core';

enum CounterType {
  'COMMANDER' = 'commander',
  'PLANESWALKER' = 'planeswalker',
  'TOKEN' = 'token',
  'INFECT' = 'infect',
  'LIFE' = 'life',
}

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss'],
})
export class PlayerBoardComponent implements OnInit {
  @Input() player: any;
  @Input() nbPlayers: number;
  public randomDiceToShow = 1;
  public randomDiceAnimationIsActive = false;
  public isCounterFocused: boolean;
  public counterFocused: string;
  public counterType = CounterType;
  public lifeCounterHistoricalIsShown: boolean;
  public lifeCounterHistoricalIsAdd: boolean;
  public lifeCounterHistoricalAdd = 0;
  public lifeCounterHistoricalRemove = 0;
  public lifeCounterTimeOut: any;

  constructor() {
    this.isCounterFocused = false;
  }

  ngOnInit() {}

  addPlayerLife() {
    this.player.life += 1;
    this.lifeCounterHistoricalAdd += 1;
    this.lifeCounterHistoricalIsAdd = true;
    this.lifeCounterHistoricalIsShown = true;
    this.handleLifeHistorical();
  }

  removePlayerLife() {
    this.player.life -= 1;
    this.lifeCounterHistoricalRemove += 1;
    this.lifeCounterHistoricalIsAdd = false;
    this.lifeCounterHistoricalIsShown = true;
    this.handleLifeHistorical();
  }

  selectCounterToManage(counterName: string) {
    this.isCounterFocused = !this.isCounterFocused;
    this.counterFocused = counterName;
  }

  addCounter() {
    switch (this.counterFocused) {
      case CounterType.COMMANDER :
        this.player.commanderCounter += 1;
        break;
      case CounterType.PLANESWALKER :
        this.player.planeswalkerCounter += 1;
        break;
      case CounterType.TOKEN :
        this.player.tokenCounter += 1;
        break;
      case CounterType.INFECT :
        this.player.infectCounter += 1;
        break;
      default :
        break;
    }
  }

  removeCounter() {
    switch (this.counterFocused) {
      case CounterType.COMMANDER :
        if (this.player.commanderCounter > 0) {
          this.player.commanderCounter -= 1;
        }
        break;
      case CounterType.PLANESWALKER :
        if (this.player.planeswalkerCounter > 0) {
          this.player.planeswalkerCounter -= 1;
        }
        break;
      case CounterType.TOKEN :
        if (this.player.tokenCounter > 0) {
          this.player.tokenCounter -= 1;
        }
        break;
      case CounterType.INFECT :
        if (this.player.infectCounter > 0) {
          this.player.infectCounter -= 1;
        }
        break;
      default :
        break;
    }
  }

  handleLifeHistorical() {
    clearTimeout(this.lifeCounterTimeOut);
    this.lifeCounterTimeOut = setTimeout(() => {
      this.lifeCounterHistoricalIsShown = false;
      this.lifeCounterHistoricalAdd = 0;
      this.lifeCounterHistoricalRemove = 0;
      this.lifeCounterHistoricalIsAdd = false;
    }, 700);
  }

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
