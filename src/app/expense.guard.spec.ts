import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { expenseGuard } from './expense.guard';
import { provideRouter } from '@angular/router';
import { StorageService } from './storage.service';

describe('expenseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => expenseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        StorageService
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
