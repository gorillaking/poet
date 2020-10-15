import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LobbyInfo } from '../lobby-info';
import { LobbyService} from '../lobby.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MakeRoomDialogComponent } from '../make-room-dialog/make-room-dialog.component';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {
  lobbyUpdateSub: Subscription;
  lobbyInfo: LobbyInfo[] = [];
  
  constructor(private lobbyService: LobbyService,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lobbyUpdateSub = this.lobbyService.onUpdate().subscribe((lobbyInfo: LobbyInfo[]) => { this.lobbyInfo = lobbyInfo });
    this.lobbyService.join();
  }

  ngOnDestroy(): void {
    this.lobbyUpdateSub.unsubscribe();
    this.lobbyService.leave();
  }

  showCreateRoomDialog(): void {
    const dialogConfig = new MatDialogConfig();
    let createRoomDialog = this.matDialog.open(MakeRoomDialogComponent, dialogConfig);
    createRoomDialog.afterClosed().subscribe((data: any) => {
      if(!data) { return; }
      if(data.success) {
        this.router.navigate([`game/${data.gameId}`]);
      } else {
        this.showError(data.message);
      }
    })
  }

  showError(message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: message
    };
    this.matDialog.open(PopupDialogComponent, dialogConfig);
  }

  join(gameId: string): void{
    this.router.navigate([`game/${gameId}`]);
  }
}
