import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateNbPlayers } from '../actions/nbPlayers.actions';
import { updateHeartBeatMode } from '../actions/heartbeatMode.actions';
import { updateLife } from '../actions/lifeSetting.actions';
import { updateTimeModeIsActive, updateTurnTimeSet } from '../actions/timeMode.actions';

@Component({
  selector: 'app-list',
  templateUrl: 'sidebar.page.html',
})
export class SidebarPage implements OnInit {
  public nbPlayersRangeValue: number;
  public lifeSettingRangeValue: number;
  public turnTimeSet: number;
  public turnTimeMinute: number;
  public turnTimeSecond: number;
  public timeModeIsActive: boolean;
  public heartBeatModeIsActive: boolean;

  constructor(private store: Store<any>) {
    store.pipe(select('nbPlayers')).subscribe(nbPlayers => this.nbPlayersRangeValue = nbPlayers.nbPlayers);
    store.pipe(select('lifeSetting')).subscribe(lifeSetting => this.lifeSettingRangeValue = lifeSetting.lifeSetting);
    store.pipe(select('heartBeatMode')).subscribe(heartBeatMode => this.heartBeatModeIsActive = heartBeatMode.isActive);
    store.pipe(select('timeMode')).subscribe((timeMode) => {
      this.timeModeIsActive = timeMode.isActive;
      this.turnTimeSet = timeMode.turnTimeSet;
      this.turnTimeMinute = Math.floor(this.turnTimeSet / 60);
      this.turnTimeSecond = this.turnTimeSet - this.turnTimeMinute * 60;
    });
  }

  ngOnInit() {

  }

  handleNbPlayersChange(event) {
    this.store.dispatch(updateNbPlayers({ nbPlayers: event.target.value }));
  }

  handleLifeSettingChange(event) {
    this.store.dispatch(updateLife({ lifeSetting: event.target.value }));
  }

  handleHeartBeatModeChange(event) {
    this.store.dispatch(updateHeartBeatMode({isActive: event.target.checked}));
  }

  handleTimeModeChange(event) {
    this.store.dispatch(updateTimeModeIsActive({isActive: event.target.checked}));

  }

  handleTimeRangeChange(event) {
    this.store.dispatch(updateTurnTimeSet({turnTimeSet: event.target.value}));
    this.turnTimeMinute = Math.floor(event.target.value / 60);
    this.turnTimeSecond = event.target.value - this.turnTimeMinute * 60;

  }
}
