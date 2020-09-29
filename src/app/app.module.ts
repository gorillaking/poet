import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { LobbyComponent } from './lobby/lobby.component';
import { environment } from 'src/environments/environment';
import { PopupComponent } from './popup/popup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MakeRoomComponent } from './make-room/make-room.component';

const config: SocketIoConfig = { url: environment.url, options: {} }

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    EnterNameComponent,
    LobbyComponent,
    PopupComponent,
    MakeRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent]
})
export class AppModule { }
