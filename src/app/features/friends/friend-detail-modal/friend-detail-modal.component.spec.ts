import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDetailModalComponent } from './friend-detail-modal.component';

describe('FriendDetailModalComponent', () => {
  let component: FriendDetailModalComponent;
  let fixture: ComponentFixture<FriendDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
