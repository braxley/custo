import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurMoviesComponent } from './our-movies.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OurMoviesComponent],
  imports: [CommonModule, FormsModule],
})
export class OurMoviesModule {}
