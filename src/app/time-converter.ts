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

  fullFormat(): string {
    let secondSplit = this.second.toString().split('.');
    let secondStr = secondSplit[0].padStart(2, '0');
    let millisecondStr = secondSplit.length < 2 ? "000" : secondSplit[1].padEnd(3, '0');
    return `${this.minute.toString().padStart(2, '0')}:${secondStr}.${millisecondStr}`;
  }

  format(): string {
    let secondSplit = this.second.toString().split('.');
    let secondStr = secondSplit[0].padStart(2, '0');
    return `${this.minute.toString().padStart(2, '0')}:${Math.floor(this.second).toString().padStart(2, '0')}`;
  }
}
