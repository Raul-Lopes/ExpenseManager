import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseEntryComponent } from './expense-entry.component';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ExpenseEntryComponent', () => {
  let component: ExpenseEntryComponent;
  let fixture: ComponentFixture<ExpenseEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseEntryComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
