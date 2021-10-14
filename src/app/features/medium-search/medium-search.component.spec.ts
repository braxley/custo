import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumSearchComponent } from './medium-search.component';

describe('MediumSearchComponent', () => {
  let component: MediumSearchComponent;
  let fixture: ComponentFixture<MediumSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
