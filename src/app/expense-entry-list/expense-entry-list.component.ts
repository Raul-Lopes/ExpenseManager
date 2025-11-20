// expense-entry-list.component.ts
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpenseEntry } from '@app/expense-entry';
import { DebugService } from '@app/debug.service';
import { ExpenseEntryService } from '@app/expense-entry.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';

@Component({
  selector: 'app-expense-entry-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './expense-entry-list.component.html',
  styleUrls: ['./expense-entry-list.component.css'],
  providers: [DebugService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseEntryListComponent {
  title = signal('Expense Entry List');
  expenseEntries = signal<ExpenseEntry[]>([]);

  private debugService = inject(DebugService);
  private restService = inject(ExpenseEntryService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.debugService.info("Expense Entry List component initialized");
    this.loadExpenseEntries();
  }

  private loadExpenseEntries() {
    this.restService.getExpenseEntries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => this.expenseEntries.set(data),
        error: (err) => console.error('Failed to load expenses:', err)
      });
  }

  deleteExpenseEntry(evt: Event, id: number) {
    evt.preventDefault();
    if (confirm("Are you sure to delete the entry?")) {
      this.restService.deleteExpenseEntry(id)
        .subscribe({
          next: () => this.loadExpenseEntries(),
          error: (err) => console.error('Failed to delete expense:', err)
        });
    }
  }
}
