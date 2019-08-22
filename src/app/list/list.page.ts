import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {decrement, increment} from '../actions/nbPlayers.actions';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public nbPlayersRangeValue: number;
  public oldNbPlayersRangeValue: number;

  constructor(private store: Store<{ nbPlayers: number }>) {
    store.pipe(select('nbPlayers')).subscribe(nbPlayers => this.nbPlayersRangeValue = nbPlayers.nbPlayers);
  }

  ngOnInit() {
  }

  handleNbPlayersChange(event) {
    if (this.nbPlayersRangeValue > event.target.value && this.nbPlayersRangeValue !== this.oldNbPlayersRangeValue) {
      this.store.dispatch(decrement());
    } else if (this.nbPlayersRangeValue < event.target.value && this.nbPlayersRangeValue !== this.oldNbPlayersRangeValue) {
      this.store.dispatch(increment());
    }
  }
}
