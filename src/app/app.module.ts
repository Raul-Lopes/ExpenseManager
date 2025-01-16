// Importing necessary Angular modules and functionalities.
import { BrowserModule } from '@angular/platform-browser'; // Essential module for running Angular applications in a web browser.
import { NgModule } from '@angular/core'; // Decorator module for defining an Angular module.
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Module for HTTP client functionality and DI-based interceptors.
import { AppRoutingModule } from './app-routing.module'; // Custom module for routing configuration.
import { AppComponent } from './app.component'; // Root component of the application.
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component'; // Component for expense entry details.
import { ExpenseEntryListComponent } from './expense-entry-list/expense-entry-list.component'; // Component for listing expense entries.
import { ReactiveFormsModule } from '@angular/forms'; // Module for building and managing reactive forms.
import { LoginComponent } from './login/login.component'; // Component for the login page.
import { EditEntryComponent } from './edit-entry/edit-entry.component'; // Component for adding or editing expense entries.

@NgModule({
    // Declaring all components that are part of this module.
    declarations: [
        AppComponent, // The root component of the application.
        EditEntryComponent, // Component for adding or editing expense entries.
        ExpenseEntryComponent, // Component for viewing details of an expense entry.
        ExpenseEntryListComponent, // Component for listing all expense entries.
        LoginComponent // Component for handling user login.
    ],
    // Bootstrapping the application with the root component.
    bootstrap: [AppComponent],
    // Importing modules used throughout the application.
    imports: [
        BrowserModule, // Provides browser-specific services and tools required to run Angular apps.
        AppRoutingModule, // Includes routing configuration for navigation between components.
        ReactiveFormsModule // Enables reactive form handling in the application.
    ],
    // Defining services available for dependency injection.
    providers: [
        provideHttpClient(withInterceptorsFromDi()) // Configures HTTP client services with support for dependency-injected interceptors.
    ]
})

// Exporting the main application module.
export class AppModule { }
