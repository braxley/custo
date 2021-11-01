import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeConversionPipe } from './pipes/time-conversion.pipe';
import { MediumCardComponent } from './components/medium-card/medium-card.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { MovieGenreListComponent } from './components/movie-genre-list/movie-genre-list.component';

@NgModule({
  declarations: [
    MediumCardComponent,
    LoadingIndicatorComponent,
    TimeConversionPipe,
    MovieGenreListComponent,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    MediumCardComponent,
    LoadingIndicatorComponent,
    TimeConversionPipe,
    MovieGenreListComponent,
  ],
})
export class SharedModule {}
