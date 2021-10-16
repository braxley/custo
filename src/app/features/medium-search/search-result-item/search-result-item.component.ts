import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { CustoMedium } from 'src/app/core/interfaces/custo-medium.interfaces';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultItemComponent implements OnInit {
  @Input() result: CustoMedium = {} as CustoMedium;
  constructor() {}

  ngOnInit(): void {}
}
