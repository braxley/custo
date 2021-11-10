import { TestBed } from '@angular/core/testing';
import { MyMoviesResolver } from './my-movies.resolver';

describe('MyMoviesResolver', () => {
  let resolver: MyMoviesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MyMoviesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
