import { Component, OnInit } from '@angular/core';
import { MediumSearchService } from './medium-search.service';

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

  testGetDetails() {
    this.mediumSearchService.testGetDetails().subscribe(console.log);
  }
  testGetRatings() {
    this.mediumSearchService.testGetRatings().subscribe(console.log);
  }

  testGetImdbResponse() {
    this.mediumSearchService.tryForking().subscribe(console.log);
  }
}
