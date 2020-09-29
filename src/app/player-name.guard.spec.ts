import { TestBed } from '@angular/core/testing';

import { PlayerNameGuard } from './player-name.guard';

describe('PlayerNameGuard', () => {
  let guard: PlayerNameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayerNameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
