import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MyMoviesResolver } from './core/resolver/my-movies.resolver';
import { MediumSearchComponent } from './features/medium-search/medium-search.component';
import { MyMoviesComponent } from './features/my-movies/my-movies.component';
import { OurMoviesComponent } from './features/our-movies/our-movies.component';

const routes: Routes = [
  { path: '', component: MediumSearchComponent },
  { path: 'search', redirectTo: '' },
  { path: 'login', component: AuthComponent },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-movies',
        component: MyMoviesComponent,
        resolve: [MyMoviesResolver],
      },
      {
        path: 'our-movies',
        component: OurMoviesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
