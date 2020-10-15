import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { LobbyComponent } from './lobby/lobby.component';
import { environment } from 'src/environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { MakeRoomDialogComponent } from './make-room-dialog/make-room-dialog.component';
import { OnlyNumberDirective } from './only-number.directive';
import { GameComponent } from './game/game.component';

const config: SocketIoConfig = { url: environment.url, options: {} }

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    EnterNameComponent,
    LobbyComponent,
    PopupDialogComponent,
    MakeRoomDialogComponent,
    OnlyNumberDirective,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NoopAnimationsModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PopupDialogComponent]
})
export class AppModule { }
