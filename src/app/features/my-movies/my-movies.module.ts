import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyMoviesPageComponent } from './my-movies-page.component';
import { MyMoviesRoutingModule } from './my-movies-routing.module';

@NgModule({
  declarations: [MyMoviesPageComponent],
  imports: [SharedModule, MyMoviesRoutingModule],
})
export class MyMoviesModule {}
