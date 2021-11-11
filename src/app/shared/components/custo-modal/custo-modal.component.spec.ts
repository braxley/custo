import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustoModalComponent } from './custo-modal.component';

describe('CustoModalComponent', () => {
  let component: CustoModalComponent;
  let fixture: ComponentFixture<CustoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
