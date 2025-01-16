// Importing necessary Angular and RxJS modules for the service.
import { Injectable } from '@angular/core'; // Enables dependency injection for this service.
import { ExpenseEntry } from './expense-entry'; // Model interface for expense entries.
import { Observable, throwError } from 'rxjs'; // Observable to handle asynchronous operations and throwError for error handling.
import { catchError, retry } from 'rxjs/operators'; // RxJS operators for retrying and error handling.
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; // HTTP client utilities for REST API interaction.

@Injectable({
  providedIn: 'root' // Makes this service available application-wide through the root injector.
})
export class ExpenseEntryService {

  // Base URL for the REST API.
  private expenseRestUrl = 'http://localhost:8000/api/expenses';

  // Default HTTP headers used in requests.
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Constructor injecting the HttpClient for API interaction.
  constructor(private httpClient: HttpClient) { }

  // Method to fetch all expense entries.
  getExpenseEntries(): Observable<ExpenseEntry[]> {
    return this.httpClient.get<ExpenseEntry[]>(this.expenseRestUrl, this.httpOptions)
      .pipe(
        retry(3), // Retries the HTTP request up to 3 times in case of errors.
        catchError(this.httpErrorHandler) // Handles errors using a custom error handler.
      );
  }

  // Method to fetch a single expense entry by ID.
  getExpenseEntry(id: number): Observable<ExpenseEntry> {
    return this.httpClient.get<ExpenseEntry>(`${this.expenseRestUrl}/${id}`, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.httpErrorHandler)
      );
  }

  // Method to add a new expense entry.
  addExpenseEntry(expenseEntry: ExpenseEntry): Observable<ExpenseEntry> {
    return this.httpClient.post<ExpenseEntry>(this.expenseRestUrl, expenseEntry, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.httpErrorHandler)
      );
  }

  // Method to update an existing expense entry.
  updateExpenseEntry(expenseEntry: ExpenseEntry): Observable<ExpenseEntry> {
    return this.httpClient.put<ExpenseEntry>(
      this.expenseRestUrl + "/" + expenseEntry.id, 
      expenseEntry, 
      this.httpOptions
    )
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  // Method to delete an expense entry by ID or by passing an object.
  deleteExpenseEntry(expenseEntry: ExpenseEntry | number): Observable<ExpenseEntry> {
    const id = typeof expenseEntry == 'number' ? expenseEntry : expenseEntry.id; // Extract ID if the argument is an object.
    const url = `${this.expenseRestUrl}/${id}`;

    return this.httpClient.delete<ExpenseEntry>(url, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.httpErrorHandler)
      );
  }

  // Private method to handle HTTP errors.
  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Handles client-side or network errors.
      console.error("A client-side error occurred. The error message is: " + error.message);
    } else {
      // Handles server-side errors.
      console.error(
        `An error occurred on the server. The HTTP status code is ${error.status} and the error returned is: ${error.message}`
      );
    }

    // Returns a user-friendly error message as an observable.
    return throwError("An error occurred. Please try again.");
  }
}
