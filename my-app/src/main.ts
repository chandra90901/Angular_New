// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Import standalone AppComponent
import { appConfig } from './app/app.config';  // Optional if you have extra configurations

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
