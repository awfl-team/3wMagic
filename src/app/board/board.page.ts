import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Vibration} from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  public players = [];
  public playerBoardHeight: number;
  public playerBoardHeightInner: number;
  public nbPlayersCeiledByTwo: number;
  public turnTimeSet: number;
  public turnTimeMinute: number;
  public turnTimeSecond: number;
  nbPlayers: number;
  lifeSetting: number;
  heartBeatModeIsActive: boolean;
  timeModeInterval: any;
  timeModeIsRunning;
  timeModeIsActive: boolean;

  constructor(private store: Store<undefined>, private vibration: Vibration ) {
    store.pipe(select('nbPlayers')).subscribe(nbPlayers => this.nbPlayers = nbPlayers.nbPlayers);
    store.pipe(select('heartBeatMode')).subscribe(heartBeatMode => this.heartBeatModeIsActive = heartBeatMode.isActive);
    store.pipe(select('lifeSetting')).subscribe(lifeSetting => this.lifeSetting = lifeSetting.lifeSetting);
    this.getTimeModeDatas();

    this.timeModeInterval = setInterval(() => {
      if (this.timeModeIsRunning) {
        if (this.turnTimeSet === 0) {
          this.getTimeModeDatas();
          this.vibration.vibrate([200, 100, 200, 100, 200, 100, 200]);
        } else {
          this.turnTimeSet -= 1;
          this.turnTimeMinute = Math.floor(this.turnTimeSet / 60);
          this.turnTimeSecond = this.turnTimeSet - this.turnTimeMinute * 60;
        }
      }
    }, 1000);

    for (let i = 1; i <= this.nbPlayers; i++) {
      this.players.push(
        {id: i, name: 'Player ' + i, life: this.lifeSetting, planeswalkerCounter: 0, commanderCounter: 0, tokenCounter: 0, infectCounter: 0}
      );
    }

    this.nbPlayersCeiledByTwo = Math.ceil(this.players.length / 2);
    if (this.players.length === 2) {
      this.playerBoardHeight = 50;
    } else if (this.players.length === 1) {
      this.playerBoardHeight = 100;
    } else {
      this.playerBoardHeight = 100 / this.nbPlayersCeiledByTwo;
      this.playerBoardHeightInner = 120 / this.nbPlayersCeiledByTwo;
    }
  }

  ngOnInit() {
  }

  handleReset() {
    for (const player of this.players) {
      player.life = this.lifeSetting;
      player.commanderCounter = 0;
      player.planeswalkerCounter = 0;
      player.infectCounter = 0;
      player.tokenCounter = 0;
    }
    this.getTimeModeDatas();
  }

  handlePlayTimeMode() {
    this.timeModeIsRunning = !this.timeModeIsRunning;
  }

  getTimeModeDatas() {
    this.store.pipe(select('timeMode')).subscribe((timeMode) => {
      this.timeModeIsActive = timeMode.isActive;
      this.turnTimeSet = timeMode.turnTimeSet;
      this.turnTimeMinute = Math.floor(this.turnTimeSet / 60);
      this.turnTimeSecond = this.turnTimeSet - this.turnTimeMinute * 60;
    });
  }
}
