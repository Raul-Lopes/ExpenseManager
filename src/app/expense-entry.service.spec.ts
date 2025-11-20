import { TestBed } from '@angular/core/testing';
import { ExpenseEntryService } from './expense-entry.service';

import { provideHttpClient } from '@angular/common/http';

describe('ExpenseEntryService', () => {
  let service: ExpenseEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ExpenseEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
