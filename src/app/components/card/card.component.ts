import { Component, Input } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';

const Modules = [NzToolTipModule, NzGridModule, NzCardModule];
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [...Modules],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cardTitle: string = '';
  @Input() cardBody: string = '';
}
