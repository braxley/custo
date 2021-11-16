import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMoviesPageComponent } from './my-movies-page.component';

describe('MyMoviesComponent', () => {
  let component: MyMoviesPageComponent;
  let fixture: ComponentFixture<MyMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyMoviesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
