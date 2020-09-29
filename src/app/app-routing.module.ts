import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PlayerNameGuard } from './player-name.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'lobby', component: LobbyComponent, canActivate:[PlayerNameGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
