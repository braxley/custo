import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustoConfirmModalComponent } from './components/custo-modal/custo-confirmation-modal/custo-confirm-modal.component';
import { CustoModalComponent } from './components/custo-modal/custo-modal.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { MediumCardComponent } from './components/medium-card/medium-card.component';
import { MovieGenreListComponent } from './components/movie-genre-list/movie-genre-list.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { TimeConversionPipe } from './pipes/time-conversion.pipe';

@NgModule({
  declarations: [
    MediumCardComponent,
    LoadingIndicatorComponent,
    TimeConversionPipe,
    MovieGenreListComponent,
    CustoModalComponent,
    MovieListComponent,
    CustoConfirmModalComponent,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    MediumCardComponent,
    LoadingIndicatorComponent,
    TimeConversionPipe,
    MovieGenreListComponent,
    CustoModalComponent,
    MovieListComponent,
    CustoConfirmModalComponent,
  ],
})
export class SharedModule {}
