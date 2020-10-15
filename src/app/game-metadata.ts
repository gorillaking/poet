import { Player } from './player';
import { TimeConverter } from './time-converter';

export class GameMetadata {
  public time: TimeConverter;

  constructor(
    public id: string,
    public name: string,
    public host: Player,
    public players: number,
    public turns: number,
    duration: number) {
    this.time = new TimeConverter(duration);
  }
}
