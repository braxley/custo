import { TestBed } from '@angular/core/testing';

import { MediumSearchService } from './medium-search.service';

describe('MediumSearchService', () => {
  let service: MediumSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediumSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
