import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-custo-confirm-modal',
  templateUrl: './custo-confirm-modal.component.html',
  styleUrls: ['./custo-confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustoConfirmModalComponent {
  @Input() modalTitle = 'Confirmation';
  @Input() hasModalTitleButtons = true;
  @Input() message = 'Are you sure?';
  @Input() confirmButtonText = 'Yes';
  @Input() cancelButtonText = 'No';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  onConfirm() {
    this.confirm.emit();
    this.close.emit();
  }
}
