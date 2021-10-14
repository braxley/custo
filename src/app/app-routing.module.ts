import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediumSearchComponent } from './features/medium-search/medium-search.component';

const routes: Routes = [{ path: '', component: MediumSearchComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
