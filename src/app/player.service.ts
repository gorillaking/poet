import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private cookieService: CookieService ) { }

  getPlayer() {
    return new Player(
      this.cookieService.get('player-id'),
      this.cookieService.get('player-name'));
  }

  savePlayer(name: string) {
    let currentId = this.cookieService.get('player-id');
    if(!currentId) {
      currentId = this.generateRandomId();
    }

    this.cookieService.set('player-id', currentId);
    this.cookieService.set('player-name', name);
  }

  private generateRandomId(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
