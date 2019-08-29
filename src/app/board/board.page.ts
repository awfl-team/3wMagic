import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController } from '@ionic/angular';
import { PlayerBoardComponent } from '../player-board/player-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
})
export class BoardPage implements OnInit, OnDestroy {
  @ViewChildren(PlayerBoardComponent)
  private playerBoardComponents: QueryList<PlayerBoardComponent>;
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
  timeModeIsRunning = false;
  animationIsRunning = false;
  timeModeIsActive: boolean;

  constructor(private store: Store<undefined>,
              private vibration: Vibration,
              private alertController: AlertController,
  ) {
  }

  ngOnInit() {
    this.store.pipe(select('nbPlayers')).subscribe(nbPlayers => this.nbPlayers = nbPlayers.nbPlayers);
    this.store.pipe(select('heartBeatMode')).subscribe(heartBeatMode => this.heartBeatModeIsActive = heartBeatMode.isActive);
    this.store.pipe(select('lifeSetting')).subscribe(lifeSetting => this.lifeSetting = lifeSetting.lifeSetting);
    this.getTimeModeDatas();
    for (let i = 1; i <= this.nbPlayers; i++) {
      this.players.push(
        { id: i,
          life: this.lifeSetting,
          planeswalkerCounter: 0,
          commanderCounter: 0,
          tokenCounter: 0,
          infectCounter: 0,
          order: 0}
      );
    }
    this.getTimeModeDatas();

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

  ngOnDestroy() {
    clearInterval(this.timeModeInterval);
  }

  async handleReset() {
      const alert = await this.alertController.create({
        header: 'Reset ?',
        message: 'Please confirm that you want to reset the game !',
        animated: true,
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'danger-button',
          }, {
            text: 'Confirm',
            cssClass: 'primary-button',
            handler: async () => {
              for (const player of this.players) {
                player.life = this.lifeSetting;
                player.commanderCounter = 0;
                player.planeswalkerCounter = 0;
                player.infectCounter = 0;
                player.tokenCounter = 0;
              }
              this.getTimeModeDatas();
              clearInterval(this.timeModeInterval);
              this.timeModeIsRunning = false;
            }
          }
        ]
      });
      await alert.present();
  }

  handlePlayTimeMode() {
    this.timeModeIsRunning = !this.timeModeIsRunning;
    if (this.timeModeIsRunning) {
      this.handleTimeModeCountdown();
    } else {
      clearInterval(this.timeModeInterval);
    }
  }

  handleNextPlayerCountdown() {
    if (this.timeModeInterval) {
      this.timeModeIsRunning = true;
      this.vibration.vibrate(200);
      clearInterval(this.timeModeInterval);
      this.getTimeModeDatas();
      this.handleTimeModeCountdown();
    }
  }

  getTimeModeDatas() {
    this.store.pipe(select('timeMode')).subscribe((timeMode) => {
      this.timeModeIsActive = timeMode.isActive;
      this.turnTimeSet = timeMode.turnTimeSet;
      this.turnTimeMinute = Math.floor(this.turnTimeSet / 60);
      this.turnTimeSecond = this.turnTimeSet - this.turnTimeMinute * 60;
    });
  }

  handleTimeModeCountdown() {
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
  }

  handleRandomizer() {
    if (this.animationIsRunning === false) {
      this.animationIsRunning = true;
      const playersArray = new Array(this.players.length).fill(0).map((x, i) => i + 1);

      for (const player of this.players) {
        const rand = Math.floor(Math.random() * Math.floor(playersArray.length));
        const order = playersArray[rand];
        player.order = order;
        playersArray.splice(playersArray.indexOf(order), 1);
      }

      this.playerBoardComponents.map((playerBoardComponent => playerBoardComponent.randomizeAnimation()));
      setTimeout(() => {
        this.animationIsRunning = false;
      }, 4000);
    }
  }
}
