import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MediumSearchComponent } from './features/medium-search/medium-search.component';
import { MyMoviesComponent } from './features/my-movies/my-movies.component';

const routes: Routes = [
  { path: '', component: MediumSearchComponent },
  { path: 'login', component: AuthComponent },
  { path: 'my-movies', component: MyMoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
