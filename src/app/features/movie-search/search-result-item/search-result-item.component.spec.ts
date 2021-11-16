import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';
import { TimeConversionPipe } from 'src/app/shared/pipes/time-conversion.pipe';
import { getMockCustoMovie } from 'src/app/shared/test/test-data';
import { SearchResultItemComponent } from './search-result-item.component';

describe('SearchResultItemComponent', () => {
  let component: SearchResultItemComponent;
  let fixture: ComponentFixture<SearchResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultItemComponent, MockPipe(TimeConversionPipe)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultItemComponent);
    component = fixture.componentInstance;
    component.movieResult = getMockCustoMovie();
    component.minRating = 6.5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set isGoodMovie to true if the rating is above the threshold', () => {
    const thresholdRating = 7;
    component.movieResult.ratings.imdb = thresholdRating;
    component.minRating = thresholdRating;

    component.ngOnInit();

    expect(component.isGoodMovie).toBeTrue();
  });

  it('should set isGoodMovie to false if the rating is below the threshold', () => {
    const thresholdRating = 7;
    component.movieResult.ratings.imdb = thresholdRating - 0.1;
    component.minRating = thresholdRating;

    component.ngOnInit();

    expect(component.isGoodMovie).toBeFalse();
  });
});
