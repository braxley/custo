import { TestBed } from '@angular/core/testing';

import { FriendsResolver } from './friends.resolver';

describe('FriendsResolver', () => {
  let resolver: FriendsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FriendsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
