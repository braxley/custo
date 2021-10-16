import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './components/loading-spinner/loading-indicator.component';

@NgModule({
  declarations: [LoadingIndicatorComponent],
  imports: [CommonModule],
  exports: [LoadingIndicatorComponent],
})
export class SharedModule {}
