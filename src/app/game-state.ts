import { Player } from './player';

export class GameState {
  constructor(
    public isPlaying: boolean,
    public isPaused: boolean,
    public isTurnStarted: boolean,
    public turnOrder: Player[],
    public currentTurn: number,
    public currentTurnPlayer: Player,
    public has1PointAssigned: boolean,
    public has3PointsAssigned: boolean,
    public scores: {}
  ) {}
}
