import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { WatchWithFriendsModule } from './features/friends/watch-with-friends.module';
import { MovieSearchModule } from './features/movie-search/movie-search.module';
import { MyMoviesModule } from './features/my-movies/my-movies.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    AuthModule,
    MovieSearchModule,
    MyMoviesModule,
    WatchWithFriendsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [HeaderComponent],
})
export class AppModule {}
