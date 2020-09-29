import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateRoom } from '../create-room';
import { LobbyInfo } from '../lobby-info';
import { LobbyService} from '../lobby.service';
import { PlayerService } from '../player.service';
import { RoomService } from '../room.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {
  lobbyUpdateSub: Subscription;
  lobbyInfo: LobbyInfo[] = [];
  
  constructor(private lobbyService: LobbyService,
    private roomService: RoomService,
    private playerService: PlayerService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.lobbyUpdateSub = this.lobbyService.onUpdate().subscribe((lobbyInfo: LobbyInfo[]) => { this.lobbyInfo = lobbyInfo });
    this.lobbyService.join();
  }

  ngOnDestroy(): void {
    this.lobbyUpdateSub.unsubscribe();
    this.lobbyService.leave();
  }

  createRoom(): void {
    this.roomService.createRoom(new CreateRoom("test", 5, 3, 1000), this.playerService.getPlayer()).subscribe(
      (gameId: string) => {console.log('test1')},
      (error) => {
        this.showPopup(error.message);
      });
  }

  showPopup(message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: message
    };
    this.matDialog.open(PopupComponent, dialogConfig);
  }
}
