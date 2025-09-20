import { Component, inject, OnInit, signal, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { ExpenseEntry } from '../expense-entry';
import { ExpenseEntryService } from '../expense-entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-expense-entry',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseEntryComponent implements OnInit {
  title = 'Expense Entry Details';

  // Signals for state management
  expenseEntry = signal<ExpenseEntry | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Dependency injection
  private restService = inject(ExpenseEntryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (isNaN(id)) {
          throw new Error('Invalid expense ID');
        }
        return this.restService.getExpenseEntry(id).pipe(
          catchError(err => {
            console.error('Error loading expense:', err);
            this.error.set('Failed to load expense details');
            return of(null);
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (entry) => {
        this.expenseEntry.set(entry as ExpenseEntry | null);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load expense details');
        this.loading.set(false);
      }
    });
  }

  goToList() {
    this.router.navigate(['/expenses']);
  }

  goToEdit() {
    const entry = this.expenseEntry();
    if (entry?.id) {
      this.router.navigate(['/expenses/edit', entry.id]);
    }
  }
}
