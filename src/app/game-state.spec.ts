import { GameState } from './game-state';
import { Player } from './player';

describe('GameState', () => {
  it('should create an instance', () => {
    expect(new GameState(false, false, false, [], 1, new Player('', ''), false, false, {})).toBeTruthy();
  });
});
