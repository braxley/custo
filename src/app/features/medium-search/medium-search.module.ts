import { NgModule } from '@angular/core';
import { MediumSearchComponent } from './medium-search.component';
import { FormsModule } from '@angular/forms';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [MediumSearchComponent, SearchResultItemComponent],
  imports: [FormsModule, SharedModule],
})
export class MediumSearchModule {}
