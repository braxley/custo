import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyMoviesComponent } from './my-movies.component';

@NgModule({
  declarations: [MyMoviesComponent],
  imports: [SharedModule],
})
export class MyMoviesModule {}
