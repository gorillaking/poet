import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LobbyInfo } from './lobby-info';
import { TimeConverter } from './time-converter';

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
      .pipe(map((lobbyInfo: any[]) => 
        lobbyInfo.map((l: any) => { 
          return new LobbyInfo(l.id, 
            l.name,
            l.playerCount,
            l.seatedPlayers,
            l.turnCount,
            new TimeConverter(l.turnDuration),
            l.isPlaying);
        })));
  }
}
