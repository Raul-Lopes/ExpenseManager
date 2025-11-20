import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEntryComponent } from './edit-entry.component';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('EditEntryComponent', () => {
  let component: EditEntryComponent;
  let fixture: ComponentFixture<EditEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEntryComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
