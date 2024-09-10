import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';  // Importiere Zone.js direkt
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
