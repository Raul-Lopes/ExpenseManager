// Importing required Angular modules and components for the routing setup.
import { NgModule } from '@angular/core'; // Core Angular module.
import { Routes, RouterModule } from '@angular/router'; // Modules for defining and configuring routes.

// Importing components to associate with routes.
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component'; // Component to display details of an expense entry.
import { ExpenseEntryListComponent } from './expense-entry-list/expense-entry-list.component'; // Component to display a list of expense entries.
import { LoginComponent } from './login/login.component'; // Component for the login page.
import { LogoutComponent } from './logout/logout.component'; // Component for the logout page.
import { EditEntryComponent } from './edit-entry/edit-entry.component'; // Component for adding/editing expense entries.
import { AboutComponent } from './about/about.component'; // Component for the About page.

// Importing route guard for protecting routes.
import { ExpenseGuard } from './expense.guard'; // Route guard to restrict access to certain routes.

// Defining the routes for the application.
const routes: Routes = [
  { path: 'about', component: AboutComponent }, // Route to the About page.
  { path: 'login', component: LoginComponent }, // Route to the Login page.
  { path: 'logout', component: LogoutComponent }, // Route to the Logout page.
  
  // Route to display the list of expenses, protected by the ExpenseGuard.
  { path: 'expenses', component: ExpenseEntryListComponent, canActivate: [ExpenseGuard] },
  
  // Route to display the details of a specific expense, identified by its ID. Protected by the ExpenseGuard.
  { path: 'expenses/detail/:id', component: ExpenseEntryComponent, canActivate: [ExpenseGuard] },
  
  // Route to add a new expense entry. Protected by the ExpenseGuard.
  { path: 'expenses/add', component: EditEntryComponent, canActivate: [ExpenseGuard] },
  
  // Route to edit an existing expense entry, identified by its ID. Protected by the ExpenseGuard.
  { path: 'expenses/edit/:id', component: EditEntryComponent, canActivate: [ExpenseGuard] },
  
  // Default route. Redirects to the list of expenses if no specific route is provided.
  { path: '', redirectTo: 'expenses', pathMatch: 'full' }
];

// Defining and configuring the Angular module for application routing.
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuring the RouterModule with the defined routes.
  exports: [RouterModule] // Exporting RouterModule to make routing available throughout the application.
})
export class AppRoutingModule { } // Exporting the routing module to be included in the main application module.
