import { Injectable, inject } from '@angular/core';
import { ExpenseEntry, IExpenseEntry } from './expense-entry';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ExpenseEntryService {
  private readonly expenseRestUrl = 'http://localhost:8000/api/expenses';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private httpClient = inject(HttpClient);

  // Helper method to parse dates with proper typing
  private parseDates(entry: any): ExpenseEntry {
    return {
      ...entry,
      spendOn: new Date(entry.spendOn),
      createdOn: new Date(entry.createdOn)
    };
  }

  getExpenseEntries(): Observable<ExpenseEntry[]> {
    return this.httpClient.get<ExpenseEntry[]>(this.expenseRestUrl, this.httpOptions)
      .pipe(
        map((entries: any[]) => entries.map(entry => this.parseDates(entry))),
        retry(3),
        catchError(this.handleError<ExpenseEntry[]>('getExpenseEntries', []))
      );
  }

  getExpenseEntry(id: number): Observable<ExpenseEntry> {
    return this.httpClient.get<ExpenseEntry>(`${this.expenseRestUrl}/${id}`, this.httpOptions)
      .pipe(
        map((entry: any) => this.parseDates(entry)),
        retry(3),
        catchError(this.handleError<ExpenseEntry>('getExpenseEntry'))
      );
  }

  addExpenseEntry(entry: ExpenseEntry): Observable<ExpenseEntry> {
    return this.httpClient.post<ExpenseEntry>(this.expenseRestUrl, entry, this.httpOptions)
      .pipe(
        map((entry: any) => this.parseDates(entry)),
        catchError(this.handleError<ExpenseEntry>('addExpenseEntry'))
      );
  }

  updateExpenseEntry(entry: ExpenseEntry): Observable<ExpenseEntry> {
    return this.httpClient.put<ExpenseEntry>(`${this.expenseRestUrl}/${entry.id}`, entry, this.httpOptions)
      .pipe(
        map((entry: any) => this.parseDates(entry)),
        catchError(this.handleError<ExpenseEntry>('updateExpenseEntry'))
      );
  }

  deleteExpenseEntry(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.expenseRestUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('deleteExpenseEntry'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed:`, error);

      let userMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        userMessage = 'A client-side error occurred';
      } else if (error.status === 0) {
        userMessage = 'Server unavailable';
      } else if (error.status === 404) {
        userMessage = 'Resource not found';
      }

      // Return a user-friendly error message
      return throwError(() => new Error(userMessage));
    };
  }
}
