import {Component, Input, OnInit} from '@angular/core';

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
  public isCounterFocused: boolean;
  public counterFocused: string;
  public counterType = CounterType;

  constructor() {
    this.isCounterFocused = false;
  }

  ngOnInit() {}

  addPlayerLife() {
    this.player.life += 1;
  }
  removePlayerLife() {
    this.player.life -= 1;
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
}
