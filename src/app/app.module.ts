import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { ExpenseEntryListComponent } from './expense-entry-list/expense-entry-list.component'
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';

@NgModule({
    declarations: [
        AppComponent,
        ExpenseEntryComponent,
        LoginComponent,
        EditEntryComponent,
        ExpenseEntryListComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule, 
        ReactiveFormsModule 
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
 })
 
export class AppModule { }
