export class TimeConverter {
  constructor(
    private _time: number
  ){}

  get time(): number {
    return this._time;
  }

  get minute(): number {
    return Math.floor(this._time / 60000);
  }

  get second(): number {
    return (this._time % 60000) / 1000;
  }

  format(): string {
    return `${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`;
  }
}
