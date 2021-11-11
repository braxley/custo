import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyMoviesRoutingModule } from './my-movies-routing.module';
import { MyMoviesComponent } from './my-movies.component';

@NgModule({
  declarations: [MyMoviesComponent],
  imports: [SharedModule, MyMoviesRoutingModule],
})
export class MyMoviesModule {}
