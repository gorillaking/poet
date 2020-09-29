import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { CreateRoom } from './create-room';
import { Player } from './player';
import { SocketResponse } from './socket-response';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private socket: Socket) {}

  createRoom(room: CreateRoom, player: Player): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.emit('create-room', room, player, (response: SocketResponse) => {
        console.log('creating room!');
        if(response.success){
          subscriber.next(response.data.gameId);
        } else {
          subscriber.error({ error: response.error, message: response.message });
        }
      });
    });
  }

  join(gameId: string, player: Player): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.emit('join', gameId, player, (response: SocketResponse) => {
        if(response.success){
          subscriber.next();
        } else {
          subscriber.error({ error: response.error, message: response.message });
        }
      });
    });
  }
}
