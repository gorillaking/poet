import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LobbyInfo } from './lobby-info';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  constructor(private socket: Socket) { }

  join(): void {
    this.socket.emit('join-lobby');
  }

  leave(): void {
    this.socket.emit('leave-lobby');
  }

  onUpdate(): Observable<LobbyInfo[]> {
    return this.socket.fromEvent('lobby-update')
      .pipe(map((lobbyInfo: LobbyInfo[]) => 
        lobbyInfo.map((l: LobbyInfo) => { 
          return new LobbyInfo(l.id, l.name, l.playerCount, l.seatedPlayers, l.turnCount, l.turnDuration, l.isPlaying);
        })));
  }
}
