import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  selector: 'app-medium-card',
  templateUrl: './medium-card.component.html',
  styleUrls: ['./medium-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediumCardComponent {
  @Input() mediumData!: CustoMedium;
}
