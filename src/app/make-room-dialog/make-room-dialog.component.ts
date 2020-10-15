import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateRoom } from '../create-room';
import { PlayerService } from '../player.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-make-room-dialog',
  templateUrl: './make-room-dialog.component.html',
  styleUrls: ['./make-room-dialog.component.css']
})
export class MakeRoomDialogComponent implements OnInit {
  constructor(private roomService: RoomService,
    private playerService: PlayerService,
    public dialogRef: MatDialogRef<MakeRoomDialogComponent>) { }

  ngOnInit(): void {
  }

  createRoom(name: string, players: number, turns: number, minutes: number, seconds: number): void {
    this.roomService.createRoom(new CreateRoom(name, players, turns, (+minutes * 60 + +seconds) * 1000), this.playerService.getPlayer()).subscribe(
      (gameId: string) => {
        this.dialogRef.close({ success: true, gameId: gameId });
      },
      (error) => {
        this.dialogRef.close({ success: false, error: error.error  , message: error.message });
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
