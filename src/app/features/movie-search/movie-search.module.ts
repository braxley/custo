import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MovieSearchPageComponent } from './movie-search-page.component';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
@NgModule({
  declarations: [MovieSearchPageComponent, SearchResultItemComponent],
  imports: [FormsModule, SharedModule],
})
export class MovieSearchModule {}
