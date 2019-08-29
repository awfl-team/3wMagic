import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BoardPage } from './board.page';
import { PlayerBoardComponent } from '../player-board/player-board.component';
import { PlayerCountersComponent } from '../player-counters/player-counters.component';
import { PlayerLifeComponent } from '../player-life/player-life.component';

const routes: Routes = [
  {
    path: '',
    component: BoardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BoardPage, PlayerBoardComponent, PlayerCountersComponent, PlayerLifeComponent]
})
export class BoardPageModule {}
