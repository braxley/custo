import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './components/loading-spinner/loading-indicator.component';
import { TimeConversionPipe } from './pipes/time-conversion.pipe';

@NgModule({
  declarations: [LoadingIndicatorComponent, TimeConversionPipe],
  imports: [CommonModule],
  exports: [LoadingIndicatorComponent, TimeConversionPipe],
})
export class SharedModule {}
