import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMoviesPageComponent } from './my-movies-page.component';

const routes: Routes = [{ path: '', component: MyMoviesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMoviesRoutingModule {}
