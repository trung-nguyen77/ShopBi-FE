import { TestBed } from '@angular/core/testing';

import { AuthPmGuard } from './auth-pm.guard';

describe('AuthPmGuard', () => {
  let guard: AuthPmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
