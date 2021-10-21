import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MediumSearchComponent } from './features/medium-search/medium-search.component';
import { MyMoviesComponent } from './features/my-movies/my-movies.component';

const routes: Routes = [
  { path: '', component: MediumSearchComponent },
  { path: 'search', redirectTo: '' },
  { path: 'login', component: AuthComponent },
  { path: 'my-movies', component: MyMoviesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
