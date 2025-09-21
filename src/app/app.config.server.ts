import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { PLATFORM_ID } from '@angular/core';

export const config = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    { provide: PLATFORM_ID, useValue: 'server' }
  ]
});
