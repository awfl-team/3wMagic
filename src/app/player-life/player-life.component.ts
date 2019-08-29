import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-life',
  templateUrl: './player-life.component.html',
})
export class PlayerLifeComponent implements OnInit {
  @Input() player: any;
  public lifeCounterHistoricalIsShown: boolean;
  public lifeCounterHistoricalIsAdd: boolean;
  public lifeCounterHistoricalAdd = 0;
  public lifeCounterHistoricalRemove = 0;
  public lifeCounterTimeOut: any;

  constructor() { }

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

  handleLifeHistorical() {
    clearTimeout(this.lifeCounterTimeOut);
    this.lifeCounterTimeOut = setTimeout(() => {
      this.lifeCounterHistoricalIsShown = false;
      this.lifeCounterHistoricalAdd = 0;
      this.lifeCounterHistoricalRemove = 0;
      this.lifeCounterHistoricalIsAdd = false;
    }, 700);
  }

  handleNameChange(event) {
    this.player.name = event.target.value;
  }

}
