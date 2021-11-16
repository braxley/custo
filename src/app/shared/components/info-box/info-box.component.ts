import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBoxComponent {
  @Input() title: string = '';
  @Input() type: 'info' | 'warning' = 'info';

  @Output() hideInfo = new EventEmitter<void>();

  onHideInfo() {
    this.hideInfo.emit();
  }
}
