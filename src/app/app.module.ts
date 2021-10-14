import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediumSearchModule } from './features/medium-search/medium-search.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MediumSearchModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
