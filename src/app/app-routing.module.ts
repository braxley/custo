import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MyMoviesResolver } from './core/resolver/my-movies.resolver';
import { FriendsComponent } from './features/friends/friends.component';
import { MediumSearchComponent } from './features/medium-search/medium-search.component';
import { MyMoviesComponent } from './features/my-movies/my-movies.component';

const routes: Routes = [
  { path: '', component: MediumSearchComponent },
  { path: 'search', redirectTo: '' },
  { path: 'login', component: AuthComponent },
  {
    path: 'user',
    canActivate: [AuthGuard],
    resolve: [MyMoviesResolver],
    children: [
      {
        path: 'my-movies',
        component: MyMoviesComponent,
      },
      {
        path: 'friends',
        component: FriendsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
