import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameMetadata } from '../game-metadata';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { RoomService } from '../room.service';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';
import { GameState } from '../game-state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { Card } from '../card';
import { TimeConverter } from '../time-converter';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  player: Player;
  players: Player[] = [];
  metadata: GameMetadata = new GameMetadata('', '', new Player('', ''), 0, 0, 0);
  state: GameState = new GameState(false, false, false, [], 0, new Player('', ''), false, false, new Map<string, number>());
  card: Card = new Card('', '');
  remainingTime: TimeConverter = new TimeConverter(0);

  constructor(private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private roomService: RoomService,
    private gameService: GameService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.player = this.playerService.getPlayer();
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(this.roomService.join(params['id'], this.player).subscribe((metadata: GameMetadata) => {
        this.metadata = metadata;
      },
      (error: any) => {
        this.router.navigate(['/lobby']);
      }));
    });

    this.subscriptions.push(this.gameService.onGameUpdate().subscribe((state: GameState) => {
      console.log(state);
      this.state = state;
    }));

    this.subscriptions.push(this.gameService.onPlayerUpdate().subscribe((players: Player[]) => {
      this.players = players;
    }));

    this.subscriptions.push(this.gameService.onTimeUpdate().subscribe((time: TimeConverter) => {
      this.remainingTime = time;
    }));

    this.subscriptions.push(this.gameService.onAssignTurnPlayer().subscribe((player: Player) => {
      if(player.id !== this.player.id){
        this.card = new Card('', '');
      }
    }));

    this.subscriptions.push(this.gameService.onPlayerLeave().subscribe((player: Player) => {
      console.log(player);
    }));

    this.subscriptions.push(this.gameService.onGameEnd().subscribe((state: GameState) => {
      this.state = state;
      let scores = '';
      for(let playerId in state.scores){
        scores += `${this.players.find(p => p.id === playerId).name} - ${state.scores[playerId]}\n`;
      }

      const matDialogConfig = new MatDialogConfig();
      matDialogConfig.data = {
        message: scores
      }

      this.matDialog.open(PopupDialogComponent, matDialogConfig);
    }));

    this.subscriptions.push(this.gameService.onHostChange().subscribe((player: Player) => {
      this.metadata.host = player;
    }));
  }

  ngOnDestroy(): void {
    this.roomService.leave(this.player.id);
    for(let sub of this.subscriptions) {
      sub.unsubscribe();
    }

    this.subscriptions = [];
  }

  leave(): void {
    this.router.navigate(['/lobby']);
  }

  start(): void {
    this.gameService.start(this.player.id).subscribe(() => {},
    (error) => {
      const matDialogConfig = new MatDialogConfig();
      matDialogConfig.data = {
        message: error.message
      }

      this.matDialog.open(PopupDialogComponent, matDialogConfig);
    });
  }

  endTurn(): void{
    this.gameService.stopTurn(this.player.id).subscribe();
  }

  startTurn(): void {
    this.gameService.startTurn(this.player.id).subscribe((card: Card) => {
      this.card = card;
    });
  }

  pause(): void {
    this.gameService.pause(this.player.id);
  }

  resume(): void{
    this.gameService.resume(this.player.id);
  }

  assignPoint(recievingPlayerId: string, point: number): void {
    this.gameService.assignPoints(this.player.id, recievingPlayerId, point).subscribe(() => {},
    (error) => {
      const matDialogConfig = new MatDialogConfig();
      matDialogConfig.data = {
        message: error.message
      }

      this.matDialog.open(PopupDialogComponent, matDialogConfig);
    });
  }

  deductPoint(point: number): void {
    this.gameService.deductPoints(this.player.id, point).subscribe(() => {},
    (error) => {
      const matDialogConfig = new MatDialogConfig();
      matDialogConfig.data = {
        message: error.message
      }

      this.matDialog.open(PopupDialogComponent, matDialogConfig);
    });
  }

  getScore(playerId: string): number{
    return this.state.scores[playerId];
  }

  canStart(): boolean {
    return !this.state.isPlaying && this.players.length > 1 && this.player.id === this.metadata.host.id;
  }

  canStartTurn(): boolean {
    return this.state.isPlaying 
      && !this.state.isTurnStarted
      && this.player.id === this.state.currentTurnPlayer.id;
  }

  canPause(): boolean {
    return this.state.isPlaying
      && this.state.isTurnStarted
      && !this.state.isPaused
      && this.player.id === this.state.currentTurnPlayer.id;
  }

  canResume(): boolean {
    return this.state.isPlaying
      && this.state.isTurnStarted
      && this.state.isPaused
      && this.player.id === this.state.currentTurnPlayer.id;
  }

  canEndTurn(): boolean {
    return this.state.isPlaying
      && this.state.isTurnStarted
      && this.player.id === this.state.currentTurnPlayer.id;
  }

  canAssign1Point(playerId: string): boolean {
    return this.state.isPlaying
      && this.state.isTurnStarted
      && this.player.id === this.state.currentTurnPlayer.id
      && this.player.id !== playerId
      && !this.state.has1PointAssigned;
  }

  canAssign3Points(playerId: string): boolean {
    return this.state.isPlaying
      && this.state.isTurnStarted
      && this.player.id === this.state.currentTurnPlayer.id
      && this.player.id !== playerId
      && !this.state.has3PointsAssigned;
  }

  isCurrentTurnPlayer(playerId: string): boolean {
    return this.state.currentTurnPlayer.id === playerId;
  }

  canShowCard(): boolean{
    return this.isCurrentTurnPlayer(this.player.id) && this.state.isTurnStarted; 
  }

  getPlayerScore(playerId: string): number {
    return this.state.scores[playerId];
  }

  canShowPoint1(playerId: string): boolean{
    return this.state.isTurnStarted && this.player.id === this.state.currentTurnPlayer.id && playerId !== this.player.id && this.remainingTime.time != 0;
  }

  canShowPoint3(playerId: string): boolean{
    return this.state.isTurnStarted && this.player.id === this.state.currentTurnPlayer.id && playerId !== this.player.id && this.remainingTime.time != 0;
  }

  disablePoint1(): boolean{
    return this.state.has1PointAssigned;
  }

  disablePoint3(): boolean{
    return this.state.has3PointsAssigned;
  }

  canShowDeductPoint(playerId: string): boolean {
    return this.state.isTurnStarted && this.player.id === playerId && this.state.currentTurnPlayer.id === playerId;
  }
}
