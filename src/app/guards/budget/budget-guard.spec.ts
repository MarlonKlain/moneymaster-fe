import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { budgetGuard } from './budget-guard';

describe('budgetGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => budgetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
