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
    loadChildren: () => import('./sidebar/sidebar.module').then(m => m.SidebarPageModule)
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
