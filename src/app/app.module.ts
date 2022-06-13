import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import localeFr from '@angular/common/locales/fr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

registerLocaleData(localeFr);

export const TITLE = new InjectionToken<string>('title');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
