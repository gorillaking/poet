import { GameMetadata } from './game-metadata';
import { Player } from './player';

describe('GameMetaData', () => {
  it('should create an instance', () => {
    expect(new GameMetadata('', '', new Player('', ''), 0, 0, 0)).toBeTruthy();
  });
});