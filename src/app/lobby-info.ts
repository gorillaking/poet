export class LobbyInfo {
  constructor(
    public id: string,
    public name: string,
    public playerCount: number,
    public seatedPlayers: number,
    public turnCount: number,
    public turnDuration: number,
    public isPlaying: boolean) {}
}
