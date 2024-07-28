import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

const Modules = [
  RouterOutlet,
  RouterLink,
  NgClass,
  NzLayoutModule,
  NzMenuModule,
  NzBreadCrumbModule,
  NzToolTipModule,
  HeaderComponent,
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [...Modules, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isCollapsed = true;
}
