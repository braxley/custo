import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-custo-modal',
  templateUrl: './custo-modal.component.html',
  styleUrls: ['./custo-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustoModalComponent {
  @Input() modalTitle: string | null = null;
  @Input() description: string | null = null;
  @Input() hasModalTitleButtons = false;

  @Output() close = new EventEmitter<void>();

  constructor() {}

  closeModal() {
    this.close.emit();
  }
}
