import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustoMovie } from '../../interfaces/custo-medium.interfaces';
@Component({
  selector: 'app-medium-card',
  templateUrl: './medium-card.component.html',
  styleUrls: ['./medium-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediumCardComponent {
  @Input() mediumData!: CustoMovie;
}
