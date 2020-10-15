import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from './player';
import { SocketResponse } from './socket-response';
import { GameState } from './game-state';
import { Card } from './card';
import { TimeConverter } from './time-converter';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private socket: Socket) { }

  start(playerId: string): Observable<void>{
    return new Observable((subscriber) => {
      this.socket.emit('start', playerId, (response: SocketResponse) => {
        if(response.success) {
          subscriber.next();
        } else {
          subscriber.error({ error: response.error, message: response.message });
        }
      });
    });
  }

  pause(playerId: string): void{
    this.socket.emit('pause', playerId);
  }

  resume(playerId: string): void {
    this.socket.emit('resume', playerId);
  }

  startTurn(playerId: string): Observable<Card> {
    return new Observable((subscriber) => this.socket.emit('start-turn', playerId, (response: SocketResponse) => {
      if(response.success) {
        subscriber.next(new Card(response.data.point1, response.data.point3));
      } else {
        subscriber.error({ error: response.error, message: response.message });
      }
    }));
  }

  stopTurn(playerId: string): Observable<void> {
    return new Observable((subscriber) => this.socket.emit('stop-turn', playerId, (response: SocketResponse) => {
      if(response.success) {
        subscriber.next();
      } else {
        subscriber.error({ error: response.error, message: response.message });
      }
    }));
  }

  assignPoints(playerId: string, receivingPlayerId: string, points: number): Observable<void> {
    return new Observable((subscriber) => this.socket.emit('assign-points', playerId, receivingPlayerId, points, (response: SocketResponse) => {
      if(response.success){
        subscriber.next();
      } else {
        subscriber.error({ error: response.error, message: response.message });
      }
    }));
  }

  deductPoints(playerId: string, points: number): Observable<void> {
    return new Observable((subscriber) => this.socket.emit('deduct-points', playerId, points, (response: SocketResponse) => {
      if(response.success){
        subscriber.next();
      } else {
        subscriber.error({ error: response.error, message: response.message });
      }
    }));
  }

  onPlayerUpdate(): Observable<Player[]> {
    return this.socket.fromEvent<Player[]>('player-update').pipe(
      map((players: any) => {
        return players.map((p: any) => { return new Player(p.id, p.name) });
      })
    );
  }

  onGameUpdate(): Observable<GameState> {
    return this.socket.fromEvent<GameState>('game-update').pipe(
      map((state: any) => {
        return new GameState(
          state.isPlaying,
          state.isPaused,
          state.isTurnStarted,
          state.turnOrder.map((p: any) => new Player(p.id, p.name)),
          state.currentTurn,
          new Player(state.currentTurnPlayer.id, state.currentTurnPlayer.name),
          state.hasPoint1Assigned,
          state.hasPoint3Assigned,
          state.scores)
      })
    );
  }

  onTimeUpdate(): Observable<TimeConverter>{
    return this.socket.fromEvent<number>('time-update').pipe(
      map((time: number) => new TimeConverter(time))
    );
  }

  onAssignTurnPlayer(): Observable<Player>{
    return this.socket.fromEvent('assign-player').pipe(map((player: any) => {
      return new Player(player.id, player.name);
    }));
  }

  onGameEnd(): Observable<GameState>{
    return this.socket.fromEvent('end-game').pipe(map((state: any) => {
      console.log(state.currentTurnPlayer);
      return new GameState(
        state.isPlaying,
        state.isPaused,
        state.isTurnStarted,
        state.turnOrder.map((p: any) => new Player(p.id, p.name)),
        state.currentTurn,
        new Player(state.currentTurnPlayer.id, state.currentTurnPlayer.name),
        state.hasPoint1Assigned,
        state.hasPoint3Assigned,
        state.scores)
    }));
  }

  onPlayerLeave(): Observable<Player>{
    return this.socket.fromEvent('player-leave-update').pipe(map((player: any) => {
      return new Player(player.id, player.name);
    }));
  }

  onHostChange(): Observable<Player>{
    return this.socket.fromEvent('host-changed').pipe(map((player: any) => {
      return new Player(player.id, player.name);
    }));
  }
}
