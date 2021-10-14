import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumSearchComponent } from './medium-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MediumSearchComponent],
  imports: [CommonModule, FormsModule],
})
export class MediumSearchModule {}
