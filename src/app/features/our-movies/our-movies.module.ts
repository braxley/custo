import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurMoviesComponent } from './our-movies.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OurMoviesComponent],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class OurMoviesModule {}
