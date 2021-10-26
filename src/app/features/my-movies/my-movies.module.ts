import { NgModule } from '@angular/core';
import { MyMoviesComponent } from './my-movies.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MyMoviesComponent],
  imports: [SharedModule],
})
export class MyMoviesModule {}
