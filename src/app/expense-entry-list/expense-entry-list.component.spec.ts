import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseEntryListComponent } from './expense-entry-list.component';

import { provideHttpClient } from '@angular/common/http';

import { provideRouter } from '@angular/router';

describe('ExpenseEntryListComponent', () => {
  let component: ExpenseEntryListComponent;
  let fixture: ComponentFixture<ExpenseEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseEntryListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
