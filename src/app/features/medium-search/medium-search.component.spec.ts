import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideAutoSpy, Spy } from 'jasmine-auto-spies';
import { MediumSearchService } from 'src/app/core/services/medium-search.service';

import { MediumSearchComponent } from './medium-search.component';

fdescribe('MediumSearchComponent', () => {
  let component: MediumSearchComponent;
  let fixture: ComponentFixture<MediumSearchComponent>;
  let mediumSearchServiceSpy: Spy<MediumSearchService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumSearchComponent],
      imports: [FormsModule],
      providers: [provideAutoSpy(MediumSearchService)],
    }).compileComponents();
    mediumSearchServiceSpy = TestBed.inject<any>(MediumSearchService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the mediumSearchService on search', () => {
    const searchQuery = 'some search query';

    component.searchMedium(searchQuery);

    expect(mediumSearchServiceSpy.getImdbResults).toHaveBeenCalledWith(
      searchQuery
    );
  });
});
