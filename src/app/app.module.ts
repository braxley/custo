import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MediumSearchModule } from './features/medium-search/medium-search.module';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { MyMoviesComponent } from './features/my-movies/my-movies.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MyMoviesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MediumSearchModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HeaderComponent],
})
export class AppModule {}
