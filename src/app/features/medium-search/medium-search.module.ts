import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumSearchComponent } from './medium-search.component';
import { FormsModule } from '@angular/forms';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { MediumSearchService } from './medium-search.service';
@NgModule({
  declarations: [MediumSearchComponent, SearchResultItemComponent],
  imports: [CommonModule, FormsModule],
  providers: [MediumSearchService],
})
export class MediumSearchModule {}
