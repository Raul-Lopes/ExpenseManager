import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { PLATFORM_ID } from '@angular/core';

export const config = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    { provide: PLATFORM_ID, useValue: 'server' }
  ]
});
