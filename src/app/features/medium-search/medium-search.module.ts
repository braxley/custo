import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MediumSearchPageComponent } from './medium-search-page.component';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
@NgModule({
  declarations: [MediumSearchPageComponent, SearchResultItemComponent],
  imports: [FormsModule, SharedModule],
})
export class MediumSearchModule {}
