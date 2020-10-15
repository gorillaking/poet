import { LobbyInfo } from './lobby-info';
import { TimeConverter } from './time-converter';

describe('LobbyInfo', () => {
  it('should create an instance', () => {
    expect(new LobbyInfo('', '', 0, 0, 0, new TimeConverter(0), false)).toBeTruthy();
  });
});
