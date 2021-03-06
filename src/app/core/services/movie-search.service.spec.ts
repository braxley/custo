import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MovieSearchService } from './movie-search.service';

describe('MovieSearchService', () => {
  let service: MovieSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
