import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { FriendsResolver } from './core/resolver/friends.resolver';
import { MyMoviesResolver } from './core/resolver/my-movies.resolver';
import { MovieSearchPageComponent } from './features/movie-search/movie-search-page.component';

const routes: Routes = [
  { path: '', component: MovieSearchPageComponent },
  { path: 'search', redirectTo: '' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    resolve: [MyMoviesResolver],
    children: [
      {
        path: 'my-movies',
        loadChildren: () =>
          import('./features/my-movies/my-movies.module').then(
            (m) => m.MyMoviesModule
          ),
      },
      {
        path: 'friends',
        loadChildren: () =>
          import('./features/friends/watch-with-friends.module').then(
            (m) => m.WatchWithFriendsModule
          ),
        resolve: [FriendsResolver],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
