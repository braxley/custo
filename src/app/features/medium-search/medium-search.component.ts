import { Component, OnInit } from '@angular/core';
import { MediumSearchService } from 'src/app/core/services/medium-search.service';

@Component({
  templateUrl: './medium-search.component.html',
  styleUrls: ['./medium-search.component.scss'],
})
export class MediumSearchComponent {
  search = '';
  results$ = this.mediumSearchService.result$;

  constructor(private mediumSearchService: MediumSearchService) {}

  searchMedium(searchQuery: string) {
    this.mediumSearchService.getImdbResults(searchQuery);
  }
}
