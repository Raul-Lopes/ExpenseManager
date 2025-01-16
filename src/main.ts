// Importing necessary modules from Angular core for application bootstrapping and environment handling.
import { enableProdMode } from '@angular/core'; 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Importing the root application module and environment configuration.
import { AppModule } from './app/app.module'; 
import { environment } from './environments/environment';

// Checking if the application is running in production mode.
if (environment.production) {
  enableProdMode(); // Enables production mode to disable Angular's development-specific checks and logging.
}

// Bootstrapping the Angular application with the root module, AppModule.
platformBrowserDynamic()
  .bootstrapModule(AppModule) // Dynamically loads and initializes the root module.
  .catch(err => console.error(err)); // Catches and logs any errors that occur during the bootstrapping process.
