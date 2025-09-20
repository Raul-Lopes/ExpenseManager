import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { ExpenseGuard } from './expense.guard';

describe('expenseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => new ExpenseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
