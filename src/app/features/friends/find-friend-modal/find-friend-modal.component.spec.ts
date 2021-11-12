import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindFriendsModalComponent } from './find-friend-modal.component';

describe('FindFriendsComponent', () => {
  let component: FindFriendsModalComponent;
  let fixture: ComponentFixture<FindFriendsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindFriendsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFriendsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
