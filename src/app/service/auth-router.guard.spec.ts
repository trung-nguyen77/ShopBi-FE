import { TestBed } from '@angular/core/testing';

import { AuthRouterGuard } from './auth-router.guard';

describe('AuthRouterGuard', () => {
  let guard: AuthRouterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRouterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
