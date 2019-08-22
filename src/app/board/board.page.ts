import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {decrement, increment} from '../actions/nbPlayers.actions';
import {Observable} from 'rxjs';

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
  nbPlayers: number;

  constructor(private store: Store<{ nbPlayers: number }>) {
    store.pipe(select('nbPlayers')).subscribe(nbPlayers => this.nbPlayers = nbPlayers.nbPlayers);
    for (let i = 1; i <= this.nbPlayers; i++) {
      this.players.push(
        {id: i, name: 'Player ' + i, life: 20, planeswalkerCounter: 0, commanderCounter: 0, tokenCounter: 0, infectCounter: 0}
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
}
