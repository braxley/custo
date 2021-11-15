import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustoConfirmModalComponent } from './custo-confirm-modal.component';

describe('CustoConfirmModalComponent', () => {
  let component: CustoConfirmModalComponent;
  let fixture: ComponentFixture<CustoConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustoConfirmModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustoConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
