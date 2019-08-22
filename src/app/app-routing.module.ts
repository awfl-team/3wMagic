import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then(m => m.BoardPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'board', loadChildren: './board/board.module#BoardPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
