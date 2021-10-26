import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeConversionPipe } from './pipes/time-conversion.pipe';
import { MediumCardComponent } from './components/medium-card/medium-card.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    MediumCardComponent,
    LoadingIndicatorComponent,
    TimeConversionPipe,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    MediumCardComponent,
    LoadingIndicatorComponent,
    TimeConversionPipe,
  ],
})
export class SharedModule {}
