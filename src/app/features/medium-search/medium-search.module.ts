import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumSearchComponent } from './medium-search.component';
import { FormsModule } from '@angular/forms';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { SharedModule } from '../../shared/shared.module';
import { MediumCardComponent } from './medium-card/medium-card.component';
@NgModule({
  declarations: [MediumSearchComponent, SearchResultItemComponent, MediumCardComponent],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [
    MediumCardComponent
  ],
})
export class MediumSearchModule {}
