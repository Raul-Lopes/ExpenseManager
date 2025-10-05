import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenseEntry } from '../expense-entry';
import { ExpenseEntryService } from '../expense-entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DestroyRef } from '@angular/core';

@Component({
  selector: 'app-edit-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEntryComponent {
  entryId = signal<number | null>(null);
  private expenseService = inject(ExpenseEntryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // Form definition with validation
  formData = new FormGroup({
    id: new FormControl<number | null>(null),
    item: new FormControl('', [Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    category: new FormControl(''),
    location: new FormControl(''),
    spendOn: new FormControl<string>(''),
    createdOn: new FormControl<Date | null>(null)
  });

  // Convenience getters for form controls
  get itemValue() {
    return this.formData.get('item');
  }

  get amountValue() {
    return this.formData.get('amount');
  }

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.entryId.set(Number(id));
      this.loadEntryData(this.entryId()!);
    }
  }

  private loadEntryData(id: number): void {
    this.expenseService.getExpenseEntry(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (entry: ExpenseEntry) => {
          this.formData.patchValue({
            ...entry,
            amount: entry.amount,
            spendOn: entry.spendOn.toISOString().split('T')[0] // Format as YYYY-MM-DD
          });
        },
        error: (err) => console.error('Error loading entry:', err)
      });
  }

  onSubmit(): void {
    if (this.formData.invalid) return;

    const formValue = this.formData.value;

    // Create the expense entry object
    const entry: ExpenseEntry = {
      id: this.entryId() ?? 0,
      item: formValue.item || '',
      amount: Number(formValue.amount) || 0,
      category: formValue.category || '',
      location: formValue.location || '',
      spendOn: formValue.spendOn ? new Date(formValue.spendOn) : new Date(),
      createdOn: formValue.createdOn || new Date()
    };

    // Determine if we're updating or creating
    const operation = entry.id
      ? this.expenseService.updateExpenseEntry(entry)
      : this.expenseService.addExpenseEntry(entry);

    // Execute the operation
    operation.subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => console.error('Operation failed:', err)
    });
  }
}
