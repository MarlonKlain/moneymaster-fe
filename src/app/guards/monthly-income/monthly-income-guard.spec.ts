import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { monthlyIncomeGuard } from './monthly-income-guard';

describe('monthlyIncomeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => monthlyIncomeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
