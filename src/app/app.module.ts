import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MediumSearchModule } from './features/medium-search/medium-search.module';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './core/services/user-notification/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoadingSpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MediumSearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    LoadingSpinnerComponent
  ],
})
export class AppModule {}
